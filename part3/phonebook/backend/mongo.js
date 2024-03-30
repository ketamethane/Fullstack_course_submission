const mongoose = require('mongoose')

if (process.argv.length<4) {
  console.log('give password as argument')
  process.exit(1)
}

// node mongo.js <password>
//  mongodb+srv://cheonghsien:<password>@fscluster.tbatcdr.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FScluster
const password = process.argv[2]

const url =
  `mongodb+srv://cheonghsien:${password}@fscluster.tbatcdr.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FScluster`

  mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    id: Number,
  name: String,
  number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Person = mongoose.model('Person', personSchema)



const generateId = (max) => {
    return Math.floor(Math.random() * max);
  }

if (process.argv.length===5) {
    const person = new Person({
        "id": generateId(100000000),
        "name": process.argv[3], 
        "number": process.argv[4]
    })
    
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook!`)
        mongoose.connection.close()
      })
  }

// person.save().then(result => {
//   console.log('person saved!')
//   mongoose.connection.close()
// })

if (process.argv.length===3) {
    Person.find().then(result => {
        console.log('phonebook:')
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
  }
