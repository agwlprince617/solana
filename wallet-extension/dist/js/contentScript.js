
var port = chrome.runtime.connect({name: "youtube"});


let userNameSelector =
  "#app > div.page-container > ytm-watch > div.watch-below-the-player > ytm-single-column-watch-next-results-renderer > ytm-slim-video-metadata-section-renderer > ytm-slim-owner-renderer > a";

let getUserName = (videoId,timeStamp) => {
  let userName = document.querySelector(userNameSelector);
  // console.log(userName.getAttribute("href"));
  let user =  userName.getAttribute("href");
//   chrome.storage.sync.set({
//     videoId: [videoId, timeStamp],
//     userName: `${user}`,
//   });
port.postMessage({info: {videoId: videoId, userName: user}});
};

function logUrl() {
    let user=""
  console.log("Current URL:", window.location.href);
  let url = window.location.href;
  if (url.includes("v=")) {
    let videoId = window.location.search.split("v=")[1];
    let timeStamp = Date.now();
    setTimeout(()=>{
        getUserName(videoId, timeStamp)
    },2000)
    // console.log("User Name: ", userName);
  }
}

// // Initial log when the content script runs
logUrl();

navigation.addEventListener("navigate", async (e) => {
    let user=""
  let url = e.destination.url;
  // console.log(e.destination.url);
  if (url.includes("v=")) {
      let videoId = url.split("v=")[1];
      let timeStamp = Date.now();
    setTimeout(()=>{
     getUserName(videoId,timeStamp)
    },2000)
    
  }
});
