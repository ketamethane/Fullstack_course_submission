const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    // id: Number,
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Regular expression to match the phone number format
        const phoneRegex = /^(\d{2,3}-\d{7,8})$/;
        return phoneRegex.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
 }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    //returnedObject._id = returnedObject._id.toString()
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)