const fs = require("fs")
const https = require("https")
const querystring = require("querystring")

let token = null

function AuthRequest(key) {

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
            alert("authorization succeeded" + data)
            token = JSON.parse(data)
        })
    })

    req.on('error', function(err) {
        alert("error: " + err)
    })

    req.write(req_body_params);
    req.end();
}

module.exports.AuthRequest = AuthRequest