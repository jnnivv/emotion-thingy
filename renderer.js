// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const fs = require("fs")
const NodeWebcam = require( "node-webcam" )
const queryCognitive = require("./queryCognitive.js")

makeblob = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

const opts = {
    //Picture related
    width: 1280,
    height: 720,
    quality: 100,

    //Delay to take shot
    delay: 0,

    //Save shots in memory
    saveShots: true,

    // [jpeg, png] support varies
    // Webcam.OutputTypes
    output: "jpeg",

    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
    device: false,

    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
    callbackReturn: "location",

    //Logging
    verbose: false
}

const Webcam = NodeWebcam.create( opts )

function capture() {
    Webcam.capture("./captures/test_picture.jpeg", function(err, data) {
        if (err) {
            alert(err)
        }
        const bitmap = fs.readFileSync(data)
        const enc = new Buffer(bitmap).toString("base64")
        const img_encoded = `data:image/jpeg;base64,${enc}`
        $("#message").text(img_encoded)
        $("#image-stage").attr("src", img_encoded)
        queryCognitive(img_encoded)
    })
}
capture()
//$("#capture-button").addEventListener("click", capture)