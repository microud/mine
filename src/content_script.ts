import { platform } from './setting/platform';
import { getCSSResources } from './utils';

chrome.runtime.onMessage.addListener(((message, sender, sendResponse) => {
  console.log(message, sender);
  switch (message) {
    case 'get-tab-html-content':
      const htmlContent = document.documentElement.outerHTML;
      sendResponse(htmlContent);
      break;
    case 'get-page-style-sheets':
      console.log(document.styleSheets);
      getCSSResources(document.styleSheets).then(result => {
        sendResponse(result);
      });
    default:
  }
}));
