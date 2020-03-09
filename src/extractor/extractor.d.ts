export interface IRule {
  head?: boolean,
  selector: string;
  exact?: boolean;
}

export interface ISiteRule {
  description: string;
  url: RegExp | string;
  title?: IRule | string;
  author?: IRule | string;
  datetime?: IRule | string;
  content?: IRule | string;
}

export interface IExtractResult {
  title?: string;
  author?: string;
  datetime?: string;
  content?: string;
  source?: string;
  html: string;
  document: JQuery<HTMLElement>;
}