
////////////////////
// chrome.storage.onChanged.addListener(function (changes) {
//     if (changes.videoId) {
//       console.log("New item in storage", changes);
//     ;
//     }

//   });



chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === "youtube");
    port.onMessage.addListener(function(msg) {
      console.log(msg.info);
    });
  });




