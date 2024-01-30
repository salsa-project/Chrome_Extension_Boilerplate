/***********************************

              ALERT BOX

***********************************/
// Create a <style> element
const styleElement = document.createElement('style')
// Add your CSS rules to the <style> element
styleElement.textContent = `
  :root {
    --main: #43766C;
    --second: #F8FAE5;
    --third: #B19470;
    --fourth: #76453B;
  }
  *{
    padding: 0px;
    margin 0px;
  }
  #alertBox{
    position: fixed;
    top: 0px;
    height: 100%;
    width: 100%;
    background-color: rgba(67,118,108,.5);
    z-index: 9999999;
  }
  #closeAlert{
    position: absolute;
    top: 3px;
    right: 5px;
    padding: 3px 8px 4px;
    color: var(--second);
    background-color: var(--fourth);
    border-radius: 50%;
    box-shadow: -1px 1px 1px 1px var(--main);
    cursor: pointer;
  }
  #closeAlert:hover{
    background-color: var(--main);
  }
  #closeAlert:active{
    filter:brightness(1.5);
  }
  #box{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 100px;
    height: 60%;
    width: 650px;
    padding: 15px 0px;
    margin: 0px auto;
    transform: translateX(5%);
    background-color: var(--third);
    right: 0px;
  }
  #box::before{
    position: absolute;
    bottom: 0px;
    left: 0px;
    content: '';
    width: 100%;
    height: 3px;
    background-color: var(--fourth);
  }
  #box::after{
    position: absolute;
    top: 0px;
    right: 0px;
    content: '';
    width: 2px;
    height: 100%;
    background-color: var(--fourth);
  }
  #box>.titles{
    flex-grow: 1;
    width: 100%;
    margin-top: 10px;
    color: var(--second);
    text-align: center;
    border-bottom: 1px solid  var(--second);
  }
  .hide{
    display: none !important;
  }
`;
// Append the <style> element to the <head>
document.head.appendChild(styleElement);
// Create a <div> for the following text
let alertBox = `
  
<div id="alertBox" class="hide">
  <div id="box">
      <div id="closeAlert">x</div>
      <p class="titles">SELECTOR!</p>
  </div>
</div>
`
document.body.insertAdjacentHTML("afterend", alertBox);

const alertBoxContainer = document.getElementById('alertBox');
const alert = document.getElementById('box');
const closeAlert = document.getElementById('closeAlert');

alertBoxContainer.addEventListener('click', function(e){
  if(alert.contains(e.target)){
    //inside
  }else{
    //outside
    alertBoxContainer.classList.toggle('hide');
  }
})
closeAlert.addEventListener('click', function () {
  alertBoxContainer.classList.toggle('hide');
  queryText.innerText = 'Pick One From Above..'
})

/***********************************

      Handle Sending Messages

***********************************/
function sendMessage(payload) {
  // Send a message to service worker
  chrome.runtime.sendMessage(payload, response => {
    console.log("Response from service worker:", response);
  });
}

/***********************************

      Handle Received Messages

***********************************/
// Listen for messages from service worker
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'receiveText':
      let txt = message.payload;
      console.log(txt)
      // YOUR CODE HERE
      //
      //
    break;

    default:
      break;
  }
  sendResponse({ message: "from_foreground" }); // Optional response
});


/***********************************

          Copy To Clipboard

***********************************/
function copyToClipboard(value) {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}




