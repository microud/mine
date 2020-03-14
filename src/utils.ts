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

export async function getCSSResources(styles: string[]): Promise<string> {
  const files = await Promise.all(styles.filter(link => !!link).map(link => axios.get(link)));
  return files.map(response => response.data).join('\n');
}

export async function getCurrentPageCSS(): Promise<string> {
  const links = await new Promise<any>(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, 'get-page-style-sheets', response => {
        resolve(response);
      });
    });
  });

  return getCSSResources(links);
}
