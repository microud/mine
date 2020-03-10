export const storage = {
  get(keys: string | string[] | Object | null,): Promise<any> {
    return new Promise(resolve => {
      chrome.storage.sync.get(keys, items => {
        resolve(items);
      });
    });
  },
  set(items: Object): Promise<void> {
    return new Promise(resolve => {
      chrome.storage.sync.set(items, () => {
        resolve();
      });
    });
  }
};
