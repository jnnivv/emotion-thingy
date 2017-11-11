const fs = require("fs")
const webcam = require("./webcam")
const webcam_server = require("./webcam_server")
const spotify = require("./spotify")
const transmissor = require("./transmissor.js")

document.querySelector("#capture-button").addEventListener("click", webcam.capture)


spotify.AuthRequest(spotify.getRecommendations, {
  seed_genres: "anime",
  limit: 5,
  target_valence: 0.5
})