const fs = require("fs")
const webcam = require("./webcam")
const spotify = require("./spotify")

document.querySelector("#capture-button").addEventListener("click", webcam.capture)


