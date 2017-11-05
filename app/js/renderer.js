const fs = require("fs")
const webcam = require("./webcam")
const spotify = require("./spotify")

document.querySelector("#capture-button").addEventListener("click", webcam.capture)


spotify.AuthRequest(spotify.getRecommendations, {
  limit: 5,
  max_acousticness: 0.5,
  max_danceability: 0.5,
  max_energy: 0.5,
  max_instrumentalness: 0.5,
  max_tempo: 0.5,
  max_valence: 0.5
})