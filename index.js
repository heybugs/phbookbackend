const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const assert = require('assert')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
require('dotenv').config()
const Person = require('./models/person')
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
    ].join(' ')
  })
)
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})

// 默认页面
app.get('/', (req, res) => {
  res.send('<h1>Hello ！</h1>')
})

// 获取所有数据
app.get('/api/persons', (req, res) => {
  Person.find({}).then((all) => {
    res.json(all)
  })
})

// 获取当前信息
app.get('/info', (req, res) => {
  let allCounter
  Person.find({}).then((all) => {
    allCounter = all.length
    let time = new Date()
    let info = `
  <div>
  <h2>phonebook has info for ${allCounter} people</h2>
  <p>${time}</p>
  </div>
  `
    res.send(info)
  })
})

// 查询单独id信息
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

// 删除一条电话簿
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

// 添加一条电话簿

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined && body.number === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  })
  person
    .save()
    .then((savePerson) => {
      res.json(savePerson)
    })
    .catch((error) => {
      // TODO
      assert.equal(error.errors['name'].message)
      error = person.validateSync()
      assert.equal(error.errors['number'].message)
      res.send()
    })
})
// 更新一条电话簿
app.put('/api/persons/:id', (req, res) => {
  Person.update(
    { name: req.body.name },
    { $set: { number: req.body.number } }
  ).then(() => {
    res.status(200).end()
  })
})
