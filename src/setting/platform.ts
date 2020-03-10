import { IPlatformSetting } from './setting';
import { storage } from './storage';

export const platform = {
  async get(name: string): Promise<IPlatformSetting> {
    const setting = await storage.get(name);
    return setting[name];
  },

  set(name: string, settings: IPlatformSetting): Promise<void> {
    return storage.set({
      [name]: settings
    });
  }
};