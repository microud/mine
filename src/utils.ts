import axios from 'axios';

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

export async function getCSSResources(list: StyleSheetList): Promise<string> {
  console.log('styles', list);
  const links: string[] = [];
  for (let i = 0; i++; i < list.length) {
    console.log(list[i].href);
    links.push(list[i].href);
  }
  console.log(links);
  const files = await axios.all(links);
  return files.join('\n');
}

export function getCurrentPageCSS(): Promise<string> {
  return new Promise<any>(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, 'get-page-style-sheets', response => {
        resolve(response);
      });
    });
  });
}