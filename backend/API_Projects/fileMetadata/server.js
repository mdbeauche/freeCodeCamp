//  file metadata microservice for freeCodeCamp.org backend project
// https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/file-metadata-microservice/

const appName = "File Metadata Microservice"

const express = require('express')
const app = express()

// for parsing multipart/form-data (file upload)
const multer = require('multer')

// specify upload destination and upload filename
const storage = multer.diskStorage({
    destination: "./tmp",
    filename: (req, file, cb) => {
      cb(null, file.originalname + '-' + new Date().toISOString())
    }
});

const upload = multer({storage: storage})

// parse post information
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

app.post("/api/fileUpload", upload.single('upfile'), (request, response) => {

  let info = { "name": request.file.originalname,
                "size": request.file.size }

  response.json(info)
})

// port is 8080 is default for non-administrator web server
app.listen(8080, function() {
  console.log(appName + ' listening on port 8080...')
})
