
let bodyBtn = document.body;

// send msg to service-worker
bodyBtn.addEventListener('click', function(){
    //send message to service worker
    chrome.runtime.sendMessage({ action: "receiveText", payload: "any payload text" }, function(response) {
        console.log(response)
    });
})


/*=============================
    Receiving a message
=============================*/
//Receiving a message from service worker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message from service worker:", message);
    sendResponse({ message: "from_popup" }); // Optional response
});

/*=============================
        Functions
=============================*/
/* Copy To Clipboard */
function copyToClipboard(value) {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}
