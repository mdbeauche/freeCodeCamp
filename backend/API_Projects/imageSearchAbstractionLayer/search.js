// search function placed into module for practice

const request = require('request')

const options = {
    url: 'googlecustomsearchurl',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'googleuseragent'
    }
}

// usage: request(options, callback)

// TODO: implement search
// TODO: implement offset

module.exports = function(query, offset, callback) {

  request(url, { json: true }, (error, response, body) => {

    if (error || response.statusCode != 200) {
      return callback('Error searching ' + url + ': ' + error)
    }


  })

}
