const fs = require("fs")
const https = require("https")
const querystring = require("querystring")
const youtube = require("./youtube")

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
                //alert("authorization succeeded" + data)
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
  const options = {
      //https://api.spotify.com/v1/recommendations?limit=50
      host: "api.spotify.com",
      port: 443,
      path: `/v1/recommendations?${params}`,
      method: "GET",
      headers: {
        //"Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token.access_token}`
      }
  }

  const req = https.request(options, function(res) {
      let playlist_data = ""
      res.on('data', function(data) {
          playlist_data += data
      })

      res.on('end', function() {
        const playlist = JSON.parse(playlist_data)
        console.log(playlist)
        //  console.log("Artist name: " + playlist.tracks[0].artists[0].name)
          console.log("Song name: " + playlist.tracks[0].name)
          console.log("Song url: " + playlist.tracks[0].external_urls.spotify)

          for(i = 0; i<playlist.tracks.length; i++) {
            const artist = playlist.tracks[i].artists[0].name
            const name = playlist.tracks[i].name
            const url = playlist.tracks[i].external_urls.spotify
            /*$("#playlist").append("<div class=\"song\">" +
                  "Artist name: " + artist + ", " + "Song name: " + name + "</div>"
              )*/

          }


          $(".row .right").last().append("<br/><iframe src=\"https://open.spotify.com/embed?uri=" + playlist.tracks[0].uri +
           "\" width=\"100%\" height=\"80\" frameborder=\"0\" allowtransparency=\"true\"></iframe>")
          //$("#playlist").append()
          //youtube.defineRequest(playlist.tracks[0].artists[0].name + " " + playlist.tracks[0].name);


      })
  })

  req.on('error', function(err) {
      alert("error: " + err)
  })

  req.end();
}



module.exports.AuthRequest = AuthRequest
module.exports.getRecommendations = getRecommendations