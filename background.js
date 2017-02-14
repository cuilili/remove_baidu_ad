var hit_count = 0;
chrome.browserAction.setBadgeBackgroundColor({color: '#0000FF'});
chrome.browserAction.setBadgeText({text: "" + hit_count});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message){
		chrome.browserAction.setBadgeBackgroundColor({color: '#0000FF'});
		hit_count += message.hit_count;
		chrome.browserAction.setBadgeText({text: '' + hit_count});
    }
});

function inject_jscode_to_page(tabId){
	chrome.tabs.executeScript(tabId, {
		file: './inject.js'
	}, null);
}

chrome.webRequest.onCompleted.addListener(function(details){
	inject_jscode_to_page(details.tabid);
}, {
	urls: ["*://*.baidu.com/*"],
	types: ["script", "xmlhttprequest", "sub_frame"]
}, ["responseHeaders"]);
