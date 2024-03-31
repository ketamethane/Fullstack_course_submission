require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


app.use(cors())

app.use(express.static('dist'))

// middleware!
app.use(express.json())

// Define a custom token for the request body
morgan.token('body', function (req) {
  return JSON.stringify(req.body);
 });
 
 // Use the custom token in the Morgan format string
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
 
morgan.token('type', function (req, res) { return req.body})


// only one send() statement per get
app.get('/info', async (request, response) => { // Ensure the function is declared as async
  try {
     // Create a new Date object
     var now = new Date();
 
     // Arrays for day and month names
     var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 
     // Extract date and time components
     var dayOfWeek = days[now.getDay()];
     var month = months[now.getMonth()];
     var day = now.getDate();
     var year = now.getFullYear();
     var hours = now.getHours();
     var minutes = now.getMinutes();
     var seconds = now.getSeconds();
     var timezoneOffset = now.getTimezoneOffset();
 
     // Format time to 12-hour format and determine AM/PM
     var ampm = hours >= 12 ? 'PM' : 'AM';
     hours = hours % 12;
     hours = hours ? hours : 12; // the hour '0' should be '12'
     minutes = minutes < 10 ? '0' + minutes : minutes;
     seconds = seconds < 10 ? '0' + seconds : seconds;
 
     // Format timezone offset
     var timezone = timezoneOffset < 0 ? 'GMT+' + (-timezoneOffset / 60) : 'GMT-' + (timezoneOffset / 60);
 
     // Combine all components into a single string
     var formattedDateTime = dayOfWeek + ', ' + month + ' ' + day + ', ' + year + ', ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm + ', ' + timezone;
 
     console.log(formattedDateTime);
 
     // Count the number of documents in the collection using async/await
     const count = await Person.countDocuments({});
     response.send(`<p>Phonebook has info for ${count} people</p><p>${formattedDateTime}</p>`);
  } catch (error) {
     console.error(error);
     response.status(500).send({ error: 'An error occurred while counting the documents' });
  }
 });
 

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {

  Person.findById(request.params.id).then(person => {
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
    // console.log(error)
    // response.status(400).send({ error: 'malformatted id' })
  // })
})

// find a way to see if doc exists. if not, need to error handle that

app.delete('/api/persons/:id', (request, response, next) => {
  // const id = request.params.id; // Assuming you have the ID from the request parameters
  // console.log('backend delete id:', id)
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    if (!result) {
      // If result is null, it means the document was not found
      return response.status(404).send({ error: 'Person not found' });
    }
    response.status(204).end()
  })
  .catch(error => next(error))
})

// const generateId = (max) => {
//   return Math.floor(Math.random() * max);
// }


// if person alr exists, do put request to entry's unique URL, likely by _id?

app.post('/api/persons/', (request, response, next) => {
  const body = request.body
  const id = request.params.id
 
  if (!body.name) {
     return response.status(400).json({ error: 'name missing' });
  }
 
  if (!body.number) {
     return response.status(400).json({ error: 'number missing' });
  }
 
  const person = {
     name: body.name,
     number: body.number,
  };
 
  Person.findOneAndUpdate({ name: body.name }, person, { upsert: true, new: true, runValidators: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => {
      console.error(error);
      response.status(500).send({ error: 'An error occurred while saving the person' });
    })
 });

 app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// // handler of requests with unknown endpoint
// app.use(unknownEndpoint)

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})