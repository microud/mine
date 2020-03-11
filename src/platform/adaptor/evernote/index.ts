import { IAdaptor } from '../adaptor';
import { IPlatformSetting } from '../../../setting/setting';
import { IExtractResult } from '../../../extractor/extractor';
import { convert } from './enml';

export class EvernoteAdaptor implements IAdaptor {
  setting: IPlatformSetting;

  constructor(setting: IPlatformSetting) {
    this.setting = setting;
  }

  public async publish(data: IExtractResult) {
    console.log(convert(data.content));
  }
}