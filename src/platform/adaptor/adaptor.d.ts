import { IPlatformSetting } from '../../setting/setting';
import { IExtractResult } from '../../extractor/extractor';

export interface IAdaptor {
  setting: IPlatformSetting;

  publish: (data: IExtractResult) => Promise<any>;
}

export interface IAdapterClass {
  new (setting: IPlatformSetting): IAdaptor;
}

export interface IOptionItem {
  key: string;
  label: string;
  type: 'number' | 'string' | 'boolean' | 'enum';
}