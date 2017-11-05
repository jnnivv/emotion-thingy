module.exports = function (img_encoded) {
  var params = {
        
  }
  $.ajax({
      // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
      //     For example, if you obtained your subscription keys from westcentralus, replace "westus" in the 
      //     URL below with "westcentralus".
      url: `https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize` + Object.keys(params).length > 0 ? "?" + $.params(params) : "",
      beforeSend: function(xhrObj){
          // Request headers
          xhrObj.setRequestHeader("Content-Type","application/json")

          // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","394da12c09d449a48490fc1ed513ccf7")
      },
      processData: false,
      type: "POST",
      // Request body
      //data: makeblob(img_encoded)
      data: '{"url": "https://www.maybelline.com/~/media/mny/us/face-makeup/modules/masthead/maybelline-fit-me-foundation-powder-face-herieth-paul-1x1.jpg?h=320&w=320&la=en-US&hash=3B5E9C176BE1DD97CB6BC8F5CD2F5C7BBA440695"}',
  })
  .done(function(data) {
      $("#result").text("success: " + JSON.stringify(data))
  })
  .fail(function(err) {
      $("#result").text("error: " + JSON.stringify(err))
  })
}