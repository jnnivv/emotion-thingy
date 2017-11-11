const fs = require("fs")
const https = require("https")
const querystring = require("querystring")

let token = null

function AuthRequest(callback, params) {
    fs.readFile("./app/.key", function(err, key) {
      if (err) {
        alert(err)
      } else {
        const req_body_params = querystring.stringify({
          grant_type: "client_credentials"
        })

        const base64_enc = new Buffer(key).toString("base64");

        const options = {
            host: "accounts.spotify.com",
            port: 443,
            path: "/api/token",
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `Basic ${base64_enc}`
            }
        }

        const req = https.request(options, function(res) {
            res.on('data', function(data) {
                token = JSON.parse(data)
                callback(token, params)
            })
        })

        req.on('error', function(err) {
            alert("error: " + err)
        })

        req.write(req_body_params);
        req.end();
      }
    })

}

function getRecommendations(token, song_params) {
  const params = querystring.stringify(song_params)
  console.log(params)
  console.log(token.access_token)
  const bearer_token = token.access_token
  const options = {
      host: "api.spotify.com",
      port: 443,
      path: `/v1/recommendations?${params}`,
      method: "GET",
      headers: {
        "Authorization": `Bearer ${bearer_token}`
      }
  }

  const req = https.request(options, function(res) {
      res.on('data', function(data) {
          console.log("recommendations succeeded" + data)
      })
  })

  req.on('error', function(err) {
      alert("error: " + err)
  })

  req.end();
}



module.exports.AuthRequest = AuthRequest
module.exports.getRecommendations = getRecommendations