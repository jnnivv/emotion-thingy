const fs = require("fs")
const webcam = require("./webcam")
const spotify = require("./spotify")

document.querySelector("#capture-button").addEventListener("click", webcam.capture)

fs.readFile("./app/.key", function(err, data) {
  if (err) {
    alert(err)
  } else {
    spotify.AuthRequest(data)
  }
})