chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.hrefList != undefined) {
      let res = chrome.history.search({ text: request.hrefList[0] }, function (results) {
        console.log(results);
        sendResponse({ results });
      });
    }
    else console.log('request.hrefList is undefined');
  }
);

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(async function (msg) {
    if (msg.hrefList != undefined) {
      let response = [];
      let dateMS = Date.now() - (86400000 * 7);
      for (let href of msg.hrefList) {
        let tmp = await SearchAsync(href, dateMS);
        if (tmp.length == 0) response.push(href);
      }
      port.postMessage(response);
    }
    else console.log('msg.hrefList is undefined');
  });
});

function SearchAsync(href, dateMS) {
  return new Promise((resolve) => {
    chrome.history.search({ text: href, startTime: dateMS, maxResults: 1 }, function (results) {
      resolve(results);
    });
  });
}