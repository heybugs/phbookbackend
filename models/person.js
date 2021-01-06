const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log('connecting to ', url)

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  // TODO
  name: {
    type: String,
    required: [true, 'User name required'],
    unique: true,
    validate: {
      validator: function (v) {
        return v.length >= 3
      },
      message: (props) => `${props.value} the name must more than 3 words`,
    },
  },
  number: {
    type: String,
    required: [true, 'User phone number required'],
    validate: {
      validator: function (v) {
        return v.split(',').join('').length >= 8
      },
      message: (props) =>
        `${props.value} the phone number must more than 8 words!`,
    },
  },
  date: Date,
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
