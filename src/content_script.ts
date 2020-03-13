chrome.runtime.onMessage.addListener(((message, sender, sendResponse) => {
  console.log(message, sender);
  switch (message) {
    case 'get-tab-html-content':
      const htmlContent = document.documentElement.outerHTML;
      sendResponse(htmlContent);
      break;
    case 'get-page-style-sheets':
      const list = document.styleSheets;
      const links: string[] = [];
      for (let i = 0; i < list.length; i++) {
        console.log(list[i].href);
        links.push(list[i].href);
      }
      sendResponse(links);
    // getCSSResources(document.styleSheets).then(result => {
    //   console.log(result);
    //
    // });
    default:
  }
}));
