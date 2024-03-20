const express = require('express')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// only one send() statement per get
app.get('/', (request, response) => {

  response.send('<h1>Hello World!</h1>')
})

// figure out how to get number of entries and show time
// fill in number and time
app.get('/info', (request, response) => {
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

    const num = persons.length;
    response.send(`<p>Phonebook has info for ${num} people</p><p>${formattedDateTime}</p>`)
  })

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})