// get mlab.com (hosted MongoDB) credentials from .env file
const dotenv = require('dotenv')
dotenv.config()
const mongoUri = process.env.MONGOLAB_URI

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

// add a user to the database, return object {username, id}
exports.addUser = function(user, callback) {
  // connect to database
  mongoClient.connect(mongoUri, (err, client) => {
    if (err) {
      return callback('<p>Unable to connect to the MongoDB server: ' + err +
        '</p>')
    }

    // connection established
    let db = client.db('projects')

    // if user already exists in database, return user object
    db.collection('exerciseTracker').findOne({ username: user }, (err, res) => {
      if (err) {
        client.close()
        return callback('<p>Error searching MongoDB collection: ' + err +
          '</p>')
      }

      if (res) {
        // user exists, return record
        client.close()

        return callback(null, res)
      } else {
        // user doesn't exist, add new user and return record
        db.collection('exerciseTracker').insertOne({ username: user, count: 0 }, (err, res) => {
          if (err) {
            client.close()
            return callback('<p>Error inserting into MongoDB collection: ' + err +
              '</p>')
          }

          // close connection
          client.close()

          // res.ops contains array of objects added
          return callback(null, res.ops[0])
        })

      }
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

    // search for all users, only return username field (and _id by default)
    db.collection('exerciseTracker').find({}).project({ username: 1 }).toArray((err, res) => {
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
exports.getExerciseLog = function(userInfo, callback) {
  // userInfo { userID, from, to, limit }
  // connect to database
  mongoClient.connect(mongoUri, (err, client) => {
    if (err) {
      return callback('<p>Unable to connect to the MongoDB server: ' + err +
        '</p>')
    }

    // connection established
    let db = client.db('projects')

    // search collection for exercise log
    // must convert userID to MongoDB ObjectID
    db.collection('exerciseTracker').findOne({ _id: mongodb.ObjectID(userInfo.userID) }, (err, res) => {
      if (err) {
        client.close()
        return callback('<p>Error searching MongoDB collection: ' + err +
          '</p>')
      }

      // close connection
      client.close()

      // build results
      let results = { _id: res._id, username: res.username, log: [] }
      // if date to, date from, or limit are specified, curate results
      if (userInfo.from && userInfo.to) {
        // curate based on date, use Date.getTime() to compare ms values
        let limit = userInfo.limit ? userInfo.limit : res.log.length
        let dateFrom = new Date(userInfo.from).getTime()
        let dateTo = new Date(userInfo.to).getTime()
        let log = res.log.slice()

        while (limit > 0) {
          // search log for an entry within the date time frame
          for (let i = 0; i < log.length; i++) {
            let currDate = new Date(log[i].date).getTime()

            if (currDate >= dateFrom && currDate <= dateTo) {
              results.log = results.log.concat( log.splice(i,1) )
              break
            }
          }

          limit--
        }

        return callback(null, results)
      } else {
        if (userInfo.limit) {
          // curate based on limit
          let log = res.log.slice()
          let limit = userInfo.limit

          while (limit > 0) {
            results.log.push(log.shift())
            limit--
          }

          return callback(null, results)
        } else {
          // don't curate
          return callback(null, res)
        }
      }

    })
  })
}

// add exercise to user's log
exports.addExercise = function(userID, exerciseInfo, callback) {
  // connect to database
  mongoClient.connect(mongoUri, (err, client) => {
    if (err) {
      return callback('<p>Unable to connect to the MongoDB server: ' + err +
        '</p>')
    }

    // connection established
    let db = client.db('projects')

    // add exercise to database
    // must convert _id string to MongoDB ObjectID
    // use $push to add to log array
    // use $inc to increment count
    db.collection('exerciseTracker').update({ _id: mongodb.ObjectID(userID) },
      { $push: { log: exerciseInfo }, $inc: { 'count': 1 } }, (err, res) => {
      if (err) {
        client.close()
        return callback('<p>Error inserting into MongoDB collection: ' + err +
          '</p>')
      }

      // object returned from update is only a description of update operation
      // query for user object to return new user object with updated exercises
      db.collection('exerciseTracker').findOne({ _id: mongodb.ObjectID(userID)}, (err, res) => {
        if (err) {
          client.close()
          return callback('<p>Error searching MongoDB collection: ' + err +
            '</p>')
        }

        // close connection
        client.close()

        return callback(null, res)
      })
    })
  })
}
