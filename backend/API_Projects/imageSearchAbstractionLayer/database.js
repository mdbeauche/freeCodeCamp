// get mlab.com (hosted MongoDB) credentials from .env file
const dotenv = require('dotenv')
dotenv.config()
const mongoUri = process.env.MONGOLAB_URI
const glitchUri = process.env.GLITCH_URI

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
// capped collection created via mongo shell and command:
// db.createCollection('imageSearchAbstractionLayer', { capped: true,
//   size: 4096, max: 10 } )

// return the search term history (capped collection)
exports.getHistory = function(callback) {
  // connect to database
  mongoClient.connect(mongoUri, (err, client) => {
    if (err) {
      return callback('<p>Unable to connect to the mongoDB server: ' + err +
        '</p>')
    }

    // connection established
    let db = client.db('projects')

    // add search term to history db
    db.collection('imageSearchAbstractionLayer').find({}).toArray((err, res) => {
      if (err) {
        client.close()
        return callback('<p>Error inserting into mongoDB collection: ' + err +
          '</p>')
      }

      // close connection
      client.close()

      return callback(null, res)
    })
  })
}

// add search term to the history
exports.addSearch = function(query, callback) {
  // connect to database
  mongoClient.connect(mongoUri, (err, client) => {
    if (err) {
      return callback('<p>Unable to connect to the mongoDB server: ' + err +
        '</p>')
    }

    // connection established
    let db = client.db('projects')

    let obj = { "query": query, "date": new Date().toString() }

    // add search term to history db
    db.collection('imageSearchAbstractionLayer').insertOne(obj, (err, res) => {
      if (err) {
        client.close()
        return callback('<p>Error inserting into mongoDB collection: ' + err +
          '</p>')
      }

      // close connection
      client.close()

      return callback(null, res)
    })
  })
}
