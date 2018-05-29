// request header parser for freeCodeCamp.org backend project
// https://www.freecodecamp.org/challenges/request-header-parser-microservice

const express = require('express')
const app = express()

// apply to all requests
app.all('/', (req, res) => {

  let language = req.get('accept-language').match(/[^,]*/)[0]
  let os = req.get('user-agent').match(/\((.*?)\)/)[1]
  let ipaddress = req.get('x-forwarded-for').match(/[^,]*/)[0]

  let headers = { 'ipaddress': ipaddress, 'language': language, 'software': os }

  res.json(headers)
})


// port is 8080 is default for non-administrator web server
app.listen(8080, function() {
  console.log('Request header parser listening on port 8080...')
})
