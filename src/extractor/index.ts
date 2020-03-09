import * as $ from 'jquery';
import { IExtractResult } from './extractor';
import { extractByRule, fetchRule } from './rules';

export function extract(url: string, content: string): IExtractResult {
  // TODO extract needed value.
  const document = $(content);
  let result: IExtractResult = {
    source: url,
    document,
    html: content,
  };

  const extractor = fetchRule(url);

  if (extractor) {
    result = extractByRule(extractor, result);
  } else {
    // TODO:
    //  general extractor works here.
  }


  return result;
}