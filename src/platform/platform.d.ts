import { IAdapterClass } from './adaptor/adaptor';

export interface IPlatform {
  key: string;
  label: string;
  description?: string;
  adapter: IAdapterClass;
}

export interface IPlatformMap {
  [key: string]: IPlatform;
}