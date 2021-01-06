const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

if (process.argv.length < 5 && process.argv.length > 3) {
  console.log(
    'Please provide the password and name and number as an argument: node mongo.js <password> <name> <number>'
  )
  process.exit(1)
}

const dbname = 'phone-book'
const password = process.argv[2]
const userName = process.argv[3]
const userNumer = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.7ty9c.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

// 在 Note 模型定义中，第一个 "Note"参数是模型的单数名。
// 集合的名称将是小写的复数 notes，因为Mongoose 约定是当模式以单数(例如Note)引用集合时自动将其命名为复数(例如notes)。
const Person = mongoose.model('Person', noteSchema)

if (userName && userNumer) {
  const person = new Person({
    name: userName,
    number: userNumer,
    date: new Date(),
  })
  // 生成新的电话
  person
    .save()
    .then(() => {
      console.log(`added ${userName} number ${userNumer}to phonebook`)
      // 关闭数据库连接。 如果连接没有关闭，程序将永远不能完成它的执行。
      mongoose.connection.close()
    })
    .catch((err) => {
      console.log(err)
    })
}

if (password && !userName && !userNumer) {
  Person.find({})
    .then((result) => {
      console.log('phonebook:')
      result.forEach((note) => {
        console.log(note.name, note.number)
      })
      mongoose.connection.close()
    })
    .catch((err) => {
      console.log(err)
    })
}
