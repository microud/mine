import { IPlatformMap } from './platform';
import { EvernoteAdaptor } from './adaptor/evernote';

export const platform: IPlatformMap = {
  evernote: {
    key: 'evernote',
    label: '印象笔记',
    adapter: EvernoteAdaptor,
  }
};
