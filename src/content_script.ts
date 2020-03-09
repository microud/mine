chrome.runtime.onMessage.addListener(((message, sender, sendResponse) => {
  console.log(message, sender);
  const htmlContent = document.documentElement.outerHTML;
  sendResponse(htmlContent);
}));