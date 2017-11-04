// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


function sendToAPI() {



  $.ajax({
      // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
      //   For example, if you obtained your subscription keys from westcentralus, replace "westus" in the
      //   URL below with "westcentralus".
      url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize",
      beforeSend: function(xhrObj){
          // Request headers
          xhrObj.setRequestHeader("Content-Type","application/json");

          // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","a59001fc2df14b67ab2364ef8c324318");
      },
      type: "POST",
      // Request body
      data: '{"url": "https://www.maybelline.com/~/media/mny/us/face-makeup/modules/masthead/maybelline-fit-me-foundation-powder-face-herieth-paul-1x1.jpg?h=320&w=320&la=en-US&hash=3B5E9C176BE1DD97CB6BC8F5CD2F5C7BBA440695"}',
  })
  .done(function(data) {
    //  alert("success");
      $('#cool').text(JSON.stringify(data));
  })
  .fail(function(err) {
    $('#cool').text(JSON.stringify(err));
    //  alert("error");
  });
}

sendToAPI();
