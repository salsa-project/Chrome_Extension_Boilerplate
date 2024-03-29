/***********************************

    Handle send Messages to popup

***********************************/
function sendMessage(payload) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs && tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, payload);
        } else {
            console.error("No active tabs found.");
        }
    });
}


/***********************************

    Handle Received Messages

***********************************/
// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(handleIncomingMessage);


/***********************************

          Incoming Message

***********************************/
// Function to handle incoming messages
function handleIncomingMessage(message, sender, sendResponse) {
    // Process the incoming message based on its content
    switch (message.action) {

        // from popup.js        
        case "receiveText":
            // send msg to foreground
            sendMessage({action: "receiveText"})
            // send response to popup.js
            sendResponse({ message: 'serviceWorker: Getting Selectors!' })
        break;

        // form foreground
        case "from_foreground":
            console.log('!!!from foreground----->', message.payload)
            sendResponse({ message: 'serviceWorker: Received!' })
            break;

        default:
            console.log("Unknown message action:", message.action);
    }
}



/***********************************

          Get Tab ID For Url

***********************************/
function getTabIdForUrl(urlToMatch) {
    chrome.tabs.query({}, tabs => {
      const matchingTabs = tabs.filter(tab => tab.url && tab.url.includes(urlToMatch));
  
      if (matchingTabs.length > 0) {
        const firstMatchingTabId = matchingTabs[0].id;
        console.log(`First matching tab ID for ${urlToMatch}:`, firstMatchingTabId);
      } else {
        console.log(`No matching tabs found for ${urlToMatch}.`);
      }
    });
  }
  
  // Example: Check for tabs with "https://salsa-project.github.io/Class-Concept/" in the URL
  getTabIdForUrl("https://salsa-project.github.io/Class-Concept/");