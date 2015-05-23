		// Listen for the content script to send a message to the background page.
		chrome.extension.onMessage.addListener(function(data, sender, sendResponse) {
		//chrome.extension.onRequest.addListener(function onRequest(data, sender, sendResponse) {
			if(data['type'] === 'init') {
				// Show the page action for the tab that the sender (content script)
				// was on.
				chrome.pageAction.show(sender.tab.id);
				
				if (localStorage["enable_popup"] == 'true') {
					chrome.pageAction.setPopup({tabId:sender.tab.id, popup:"popup.html"});
				}
	
				// Return nothing to let the connection be cleaned up.
				sendResponse({});
// 			} else if(data['type'] === 'set_popup') {
// 				chrome.pageAction.setPopup({tabId:sender.tab.id, popup:"popup.html"});
// 				sendResponse({});
// 			} else if(data['type'] === 'unset_popup') {
// 				chrome.pageAction.setPopup({tabId:sender.tab.id, popup:null});
// 				sendResponse({});
			}
		});

		// Listen for clicks
		chrome.pageAction.onClicked.addListener(function(tab) {
		    //chrome.tabs.sendRequest(tab.id, {'type': 'toggle'});
		    chrome.tabs.sendMessage(tab.id, {'type': 'toggle'});
		});
