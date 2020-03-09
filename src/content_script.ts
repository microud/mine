chrome.runtime.onMessage.addListener(((message, sender, sendResponse) => {
  console.log(message, sender);
  switch (message) {
    case 'get-tab-html-content':
      const htmlContent = document.documentElement.outerHTML;
      sendResponse(htmlContent);
      break;
    default:
  }

}));