// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const fs = require("fs")
const NodeWebcam = require("node-webcam")
const cognitive = require("./cognitive")

const opts = {
    //Picture related
    width: 500,
    height: 500,
    quality: 100,

    //Delay to take shot
    delay: 0,

    //Save shots in memory
    saveShots: false,

    // [jpeg, png] support varies
    // Webcam.OutputTypes
    output: "jpeg",

    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
    device: false,

    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
    callbackReturn: "base64",

    //Logging
    verbose: false
}

const Webcam = NodeWebcam.create( opts )

capture = function () {
    //alert('capturing...')
    Webcam.capture("./captures/test_picture.jpeg", function(err, data) {
        if (err) {
            alert(err)
        }
        $("#message").text("processing image...")
        $("#image-stage").attr("src", data)

        cognitive.sendToCognitive(data)
        
    })
}

module.exports.capture = capture