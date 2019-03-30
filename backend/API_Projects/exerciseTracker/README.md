# exerciseTracker
## Technologies used: HTML, CSS, JavaScript, Node.js, dotenv, Express, MongoDB
* [freeCodeCamp Challenge](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)
* [my project on glitch.com](https://scythe-decimal.glitch.me/)
* User Story: I can create a user by posting form data username to /api/exercise/new-user and returned will be an object with username and \_id.
* User Story: I can get an array of all users by getting api/exercise/users with the same info as when creating a user.
* User Story: I can add an exercise to any user by posting form data userId(\_id), description, duration, and optionally date to /api/exercise/add. If no date supplied it will use current date. Returned will be the user object with also with the exercise fields added.
* User Story: I can retrieve a full exercise log of any user by getting /api/exercise/log with a parameter of userId(\_id). Returned will be the user object with added array log and count (total exercise count).
* User Story: I can retrieve part of the log of any user by also passing along optional parameters of from & to or limit. (Date format yyyy-mm-dd, limit = int)
