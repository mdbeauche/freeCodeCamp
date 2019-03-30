// timestamp microservice for freeCodeCamp.org backend project
// https://www.freecodecamp.org/challenges/timestamp-microservice

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('<h3>Timestamp Microservice</h3><p>Example usage:</p><code>' +
    'http://localhost:8080/December%2015,%202015</code><br><code>' +
    'http://localhost:8080/1450137600</code>')
})

// express allows RegEx in in routes
// route for unix timestamp (beginning with any number)
app.get('/:date([0-9]*)', (req, res) => {
  // :date places that property in req.params.date
  // unix timestamp is in GMT; PST is GMT - 7 hours
  let date = new Date(parseInt(req.params.date))

  // build response: { unix: , natural: }
  let result = { "unix": date.getTime(), "natural": months[date.getMonth()] +
    ' ' + date.getDate() + ', ' + date.getFullYear()}

  res.json(result)

  res.end()
})

// route for natural date (Month Day, Year, e.g. December 20, 2015)
app.get('/:date([a-zA-Z]*)', (req, res) => {
  // :date places that property in req.params.date
  let dateArray = req.params.date.split(' ')
  let month = months.indexOf(dateArray[0])
  // strip comma from day
  let day = dateArray[1].replace(',', '')
  let year = dateArray[2]

  // new Date(Year, MonthIndex, Day)
  let date = new Date(year, month, day)

  let result = { "unix": date.getTime(), "natural": months[date.getMonth()] +
    ' ' + date.getDate() + ', ' + date.getFullYear()}

  res.json(result)

  res.end()
})

// port is 8080 is default for non-administrator web server
app.listen(8080, function() {
  console.log('Timestamp Microservice listening on port 8080...')
})
