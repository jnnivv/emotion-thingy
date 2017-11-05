const webcam = require('./webcam')

document.querySelector("#capture-button").addEventListener("click", webcam.capture)