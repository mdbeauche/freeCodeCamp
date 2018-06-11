// get mlab.com (hosted MongoDB) credentials from .env file
const dotenv = require('dotenv')
dotenv.config()
const mongoUri = process.env.MONGOLAB_URI

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

// add a user to the database
exports.addUser = function(user, callback) {
  // connect to database
  mongoClient.connect(mongoUri, (err, client) => {
    if (err) {
      return callback('<p>Unable to connect to the MongoDB server: ' + err +
        '</p>')
    }

    // connection established
    let db = client.db('projects')

    let obj = {  }

    // add user to databse
    db.collection('exerciseTracker').insertOne(obj, (err, res) => {
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

// get a list of all users in the database
exports.getUsers = function(callback) {
  // connect to database
  mongoClient.connect(mongoUri, (err, client) => {
    if (err) {
      return callback('<p>Unable to connect to the MongoDB server: ' + err +
        '</p>')
    }

    // connection established
    let db = client.db('projects')

    // add search term to history db
    db.collection('exerciseTracker').find({}).toArray((err, res) => {
      if (err) {
        client.close()
        return callback('<p>Error inserting into MongoDB collection: ' + err +
          '</p>')
      }

      // close connection
      client.close()

      return callback(null, res)
    })
  })
}

// get a user's exercise log
exports.getExerciseLog = function(user, exercise, callback) {
  // connect to database
  mongoClient.connect(mongoUri, (err, client) => {
    if (err) {
      return callback('<p>Unable to connect to the MongoDB server: ' + err +
        '</p>')
    }

    // connection established
    let db = client.db('projects')

    let search = { user: user }

    // add search term to history db
    db.collection('exerciseTracker').findOne(search).toArray((err, res) => {
      if (err) {
        client.close()
        return callback('<p>Error inserting into MongoDB collection: ' + err +
          '</p>')
      }

      // close connection
      client.close()

      return callback(null, res)
    })
  })
}

// add exercise to user's log
exports.addExercise = function(user, callback) {
  // connect to database
  mongoClient.connect(mongoUri, (err, client) => {
    if (err) {
      return callback('<p>Unable to connect to the MongoDB server: ' + err +
        '</p>')
    }

    // connection established
    let db = client.db('projects')

    let obj = {  }

    // add exercise to database
    db.collection('exerciseTracker').insertOne(obj, (err, res) => {
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
