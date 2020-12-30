const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ');
  })
);
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

//  注意这里必须使用let 而不能是const 因为后面的delete请求会改变数据
let Persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

// 默认页面
app.get('/', (req, res) => {
  res.send('<h1>Hello ！</h1>');
});

// 获取所有数据
app.get('/api/persons', (req, res) => {
  res.json(Persons);
});
// 获取当前信息
app.get('/info', (req, res) => {
  let allCounter = Persons.length;
  let time = new Date();
  let info = `
  <div>
  <h2>phonebook has info for ${allCounter} people</h2>
  <p>${time}</p>
  </div>
  `;
  res.send(info);
});

// 查询单独id信息
app.get('/api/persons/:id', (req, res) => {
  const personId = Number(req.params.id);
  let person = Persons.find((item) => item.id === personId);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
});

// 删除一条电话簿
app.delete('/api/persons/:id', (req, res) => {
  const personId = Number(req.params.id);
  Persons = Persons.filter((person) => person.id !== personId);
  console.log(Persons);
  res.status(204).end();
});

// 添加一条电话簿

app.post('/api/persons', (req, res) => {
  let body = req.body;
  // console.log(body);
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing',
    });
  }
  Persons.find((item) => {
    if (body.name === item.name) {
      res.status(400).json({ error: 'name must be unique' });
    }
  });
  const person = {
    id: generateId(5, 100000),
    name: body.name,
    number: body.number,
  };
  Persons = Persons.concat(person);
  // console.log(Persons);
  res.json(person);
});

const generateId = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
};
