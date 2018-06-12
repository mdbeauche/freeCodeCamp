//  exercise tracker API for freeCodeCamp.org backend project
// https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

const appName = "Exercise Tracker"

const express = require('express')
const app = express()

const database = require('./database.js')

// serve static files (html, css) from public directory
// (separate public folder from code so code isn't sent)
// index.html is automatically sent for GET "/"
app.use(express.static(__dirname + "/public"))

// body-parser functionality now in default express
// parse incoming requests, use qs library
app.use(express.urlencoded({ extended: true }))

// create a new user from form data, return an object {username, id}
app.post("/api/exercise/new-user", (request, response) => {
  // form data
  let user = request.body['new-user-input']

  if (user) {
    database.addUser(user, (err, data) => {
      if (err) {
        response.send(err)
        return
      }

      response.send(data)
    })
  }
})

// get an array of all user objects {username, id}
// GET /api/exercise/users
app.get("/api/exercise/users", (request, response) => {
  // database.getUsers(callback)
  database.getUsers((err, data) => {
    if (err) {
      response.send(err)
      return
    }

    response.send(data)
  })
})

// get a users's exercise log from form data
app.post("/api/exercise/log", (request, response) => {
  // form data
  let userInfo = {
    userID: request.body['get-exercise-log-user'],
    from: request.body['get-exercise-date-from'],
    to: request.body['get-exercise-date-to'],
    limit: request.body['get-exercise-date-limit']
  }

  database.getExerciseLog(userInfo, (err, data) => {
    if (err) {
      response.send(err)
      return
    }

    response.send(data)
  })
})

// get a user's exercise log from url query string
// GET /api/exercise/log?{userId}[&from][&to][&limit]
app.get("/api/exercise/log:userId", (request, response) => {

  // database.getExerciseLog(user, callback)
})

// add exercises from form data
app.post("/api/exercise/add", (request, response) => {
  // form data
  let userID = request.body['add-exercise-user']

  let exerciseInfo = {
    description: request.body['add-exercise-description'],
    duration: request.body['add-exercise-duration'],
    date: request.body['add-exercise-date']
  }

  database.addExercise(userID, exerciseInfo, (err, data) => {
    if (err) {
      response.send(err)
      return
    }

    response.send(data)
  })
})

// port 8080 is default for non-administrator web server
app.listen(8080, function() {
  console.log(appName + ' listening on port 8080...')
})
