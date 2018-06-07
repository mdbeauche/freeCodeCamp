// search function placed into module for practice
const url = require('url')

// get search parameters from .env file
const dotenv = require('dotenv')
dotenv.config()
const GOOGLE_API_SEARCH = process.env.GOOGLE_API_SEARCH
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
const GOOGLE_API_CX = process.env.GOOGLE_API_CX

// npm module for http requests
const request = require('request')

// query a Google Custom Search Engine for Images
module.exports = function(query, offset, callback) {

  let search = url.parse(GOOGLE_API_SEARCH)

  search.query = {
    q: query.replace(' ', '+'),
    start: offset ? parseInt(offset) : 1,
    cx: GOOGLE_API_CX,
    key: GOOGLE_API_KEY,
    searchType: "image",
    fields: "items(image(contextLink,thumbnailLink),link,snippet)"
  }

  search = url.format(search)

  // usage: request(search, callback)
  request.get(search, (error, response, body) => {

    if (error) {
      return callback('Error searching ' + GOOGLE_API_SEARCH + ': ' + error)
    }

    if (response.statusCode != 200) {
      return callback('Error searching ' + GOOGLE_API_SEARCH + ': response code: ' + JSON.stringify(response)  )
    }

    var data = JSON.parse(body)
    var images = []
    if (data && data.items.length) {
      images = data.items.map(item => {
        return { url: item.link ? item.link : '',
          snippet: item.snippet ? item.snippet : '',
          thumbnail: item.image && item.image.thumbnailLink ?
            item.image.thumbnailLink : '',
          context: item.image && item.image.contextLink ?
            item.image.contextLink : ''
        }
      })
    }

    return callback(null, images)
  })
}
