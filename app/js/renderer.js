const fs = require("fs")
const webcam = require("./webcam")
const spotify = require("./spotify")
const youtube = require('./youtube.js')


document.querySelector("#capture-button").addEventListener("click", webcam.capture)

handleClientLoad = youtube.handleClientLoad

// Call handleAuthClick function when user clicks on "Authorize" button.
$('#execute-request-button').click(function(event) {
    youtube.handleAuthClick(event);
});


