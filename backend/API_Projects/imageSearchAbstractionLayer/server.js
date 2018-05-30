// image search abstraction layer for freeCodeCamp.org backend project
// https://www.freecodecamp.org/challenges/image-search-abstraction-layer

// get glitch.com hosting uri
const dotenv = require('dotenv')
dotenv.config()
const glitchUri = process.env.GLITCH_URI

const search = require('./search.js')
const database = require('./database.js')

const express = require('express')
const app = express()

const instructions = '<h3>Image Search Abstraction Layer</h3><p>To search for' +
  ' images: <code>' + glitchUri + 'search/</code></p><p>&emsp;Example: <code>' +
  glitchUri + 'search/birds</code></p><p>To paginate results: <code>' +
  glitchUri + 'search/birds?offset=#</code></p><p>&emsp;Example: <code>' +
  glitchUri + 'search/birds?offset=3</code></p><p>To view search history: ' +
  '<code>' + glitchUri + 'history</code></p>'

// default route, print instructions
app.get('/', (req, res) => {
  res.send(instructions)
})

// route for searching
app.get('/search/:query', (req, res) => {
  // verify query entered or reprint instructions
  if (!req.params.query) {
    res.send(instructions)
    return
  }

  let offset = req.query.offset ? '?offset=' + req.query.offset : ''

  // add search term to history
  database.addSearch(req.params.query + offset, (err, data) => {
    if (err) {
      res.send(err)
      return
    }
  })

  // search for query
  search(req.params.query, req.query.offset, (err, data) => {
    if (err) {
      res.send(err)
      return
    }

    res.send(data)
  })

})

// route for search history
app.get('/history', (req, res) => {
  // get search history
  database.getHistory((err, data) => {
    if (err) {
      res.send(err)
      return
    }

    res.send(data)
  })
})

// port 8080 is default for non-administrator web server
app.listen(8080, function() {
  console.log('Image Search Abstraction Layer listening on port 8080...')
})
