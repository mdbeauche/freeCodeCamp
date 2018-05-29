// url shortener microservice for freeCodeCamp.org backend project
// https://www.freecodecamp.org/challenges/url-shortener-microservice

// get mlab.com (hosted MongoDB) credentials from .env file
const dotenv = require('dotenv')
dotenv.config()
const mongoUri = process.env.MONGOLAB_URI

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const glitchUri = process.env.GLITCH_URI

const express = require('express')
const app = express()

// default route, print instructions
app.get('/', (req, res) => {
  res.send('<h3>URL Shortener</h3><p>To get shortened URL:</p><code>' +
    glitchUri + 'url-to-shortened</code><br><p>Example:</p><code>' + glitchUri +
    'http://www.google.com</code><br><p>To use shortened URL:</p><code>' +
    glitchUri + '1234</code>')
})

// route for shortening urls
app.get('/:url([A-Za-z]*)', (req, res) => {
  // validate url
  let urlMatch = /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

  if (!urlMatch.test(req.params.url)) {
    res.send('<p>Invalid url format. Example:</p><code>' +
      'http://www.example.com</code>')
    return
  }

  // connect to database
  mongoClient.connect(mongoUri, (err, client) => {
    if (err) {
      res.send('<p>Unable to connect to the mongoDB server: ' + err + '</p>')
      return
    }

    // connection established
    let db = client.db('projects')

    // check if already exists in db
    let query = { 'url': req.params.url }
    db.collection('urlShortener').findOne(query, (err, result) => {
      if (err) {
        res.send('<p>Error accessing mongoDB collection: ' +  err + '</p>')
        client.close()
        return
      }

      if (result) {
        // already exists in db
        res.json(result)

        // close connection
        client.close()
      } else {
        // add new url to database
        // generate shortened url in range [1000,10000)
        let shortenedUrl = glitchUri + Math.floor(1000 + Math.random() * 9000)

        let urlObj = { 'url': req.params.url, 'shortened': shortenedUrl }

        db.collection('urlShortener').insertOne(urlObj, (err, result) => {
          if (err) {
            res.send('<p>Error inserting into mongoDB collection: ' + err +
            '</p>')
            client.close()
            return
          }

          // return json
          res.json(urlObj)
          // close connection
          client.close()
        })
      }
    })
  })
})

// route for shortened urls
app.get('/:shortUrl([0-9]*)', (req, res) => {
  console.log(req.params.shortUrl)
  // connect to database
  mongoClient.connect(mongoUri, (err, client) => {
    if (err) {
      res.send('<p>Unable to connect to the mongoDB server: ' + err + '</p>')
      return
    }

    // connection established
    let db = client.db('projects')

    // lookup url in db
    let query = { 'shortened': glitchUri + req.params.shortUrl }
    db.collection('urlShortener').findOne(query, (err, result) => {
      if (err) {
        res.send('<p>Error accessing mongoDB collection: ' +  err + '</p>')
        client.close()
        return
      }

      if (result) {
        // found url in db
        res.redirect(result.url)

        // close connection
        client.close()
      } else {
        // url hasn't been shortened yet
        res.send('<p>Error: url has not been added to the database</p>')
        client.close()
      }
    })
  })
})

// port is 8080 is default for non-administrator web server
app.listen(8080, function() {
  console.log('URL shortener listening on port 8080...')
})
