const spotify = require("./spotify")

function makeBlob (dataURL) {
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

sendToCognitive = function (img_encoded) {
    $.ajax({
        // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
        //   For example, if you obtained your subscription keys from westcentralus, replace "westus" in the
        //   URL below with "westcentralus".
        url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize",
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/octet-stream")

            // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","a59001fc2df14b67ab2364ef8c324318")
        },
        processData: false,
        type: "POST",
        // Request body
        data: makeBlob(img_encoded)
        //data: '{"url": "https://www.maybelline.com/~/media/mny/us/face-makeup/modules/masthead/maybelline-fit-me-foundation-powder-face-herieth-paul-1x1.jpg?h=320&w=320&la=en-US&hash=3B5E9C176BE1DD97CB6BC8F5CD2F5C7BBA440695"}',
    })
    .done(function(data) {
        console.log(data[0].scores)
        var s = data[0].scores
        var sortedbyValueJSONArray = sortByValue(s);
        console.log(sortedbyValueJSONArray);
        //for(i = 0; i< data[0])
        $('#message').text(sortedbyValueJSONArray[sortedbyValueJSONArray.length-1][1])

        const first_val = sortedbyValueJSONArray[sortedbyValueJSONArray.length-1][0]
        const second_val = sortedbyValueJSONArray[sortedbyValueJSONArray.length-2][0]

        spotify.AuthRequest(spotify.getRecommendations, {
          seed_genres: 'k-pop,pop,mandopop',
          limit: 5,
          //max_acousticness: 0.5,
          //max_danceability: 0.5,
          //max_energy: 0.5,
          //max_instrumentalness: 0.5,
          //max_tempo: 0.5,
          max_valence: data[0].scores.neutral
        })


    })
    .fail(function(err) {
        $('#message').text(JSON.stringify(err))
    })
}

function sortByValue(jsObj){
  	var sortedArray = [];
  	for(var i in jsObj)
  	{
      console.log(scientificToDecimal(jsObj[i]))
      var num = scientificToDecimal(jsObj[i]);
  		// Push each JSON Object entry in array by [value, key]
		sortedArray.push([num, i]);
	}
	return sortedArray.sort();
}


function scientificToDecimal(num) {
    //if the number is in scientific notation remove it
    if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
        var zero = '0',
            parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
            e = parts.pop(),//store the exponential part
            l = Math.abs(e), //get the number of zeros
            sign = e/l,
            coeff_array = parts[0].split('.');
        if(sign === -1) {
            num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
        }
        else {
            var dec = coeff_array[1];
            if(dec) l = l - dec.length;
            num = coeff_array.join('') + new Array(l+1).join(zero);
        }
    }

    return num;
};

module.exports.sendToCognitive = sendToCognitive