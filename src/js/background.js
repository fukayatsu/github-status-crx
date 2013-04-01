chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.create({"url": "https://status.github.com/"});
});

var setStatus = function() {
  $.get("https://status.github.com/api/last-message.json", null, function(res) {
    var imgPaths = {
      "good": "../img/icon-green32.png",
      "minor": "../img/icon-orange32.png",
      "major": "../img/icon-red32.png"
    };

    var imgPath = imgPaths[res.status] || "../img/icon-default32.png";
    var dateStr = moment(res.created_on).format("YYYY-MM-DD HH:mm:ss");

    chrome.browserAction.setIcon({path: imgPath});
    chrome.browserAction.setTitle({title: res.body + " (" + dateStr +")"});
  });
};

$(function() {
  setStatus();
  setInterval(setStatus, 60 * 1000);
});