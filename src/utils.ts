export function getCurrentTabHTML(): Promise<{ url: string; html: string }> {
  return new Promise<{ url: string; html: string }>(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, 'get-tab-html-content', response => {
        resolve({
          url: tabs[0].url,
          html: response
        });
      });
    });
  });

}