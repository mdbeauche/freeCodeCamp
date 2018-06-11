//  exercise tracker API for freeCodeCamp.org backend project
// https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

const appName = "Exercise Tracker"

const express = require('express')
const app = express()

const database = require('./database.js')

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

// create a new user, return an object {username, id}
// POST /api/exercise/new-user
app.post("/api/exercise/new-user", (request, response) => {
  // database.addUser(user, callback)
})

// get an array of all user objects {username, id}
// GET /api/exercise/users
app.get("/api/exercise/users", (request, response) => {
  // database.getUsers(callback)
})

// get a users's exercise log
// GET /api/exercise/log?{userId}[&from][&to][&limit]
app.get("/api/exercise/log", (request, response) => {
  // database.getExerciseLog(user, callback)
})

// add exercises
// POST /api/exercise/add
app.post("/api/exercise/add", (request, response) => {
  // database.addExercise(user, exercise, callback)
})

// port is 8080 is default for non-administrator web server
app.listen(8080, function() {
  console.log(appName + ' listening on port 8080...')
})
