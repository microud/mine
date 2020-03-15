import * as $ from 'jquery';
import { IExtractResult } from './extractor';
import { extractByRule, fetchRule } from './rules';
import { getCurrentPageCSS } from '../utils';
import { inlineStyle } from './style';

function imagePreProcessor(document: JQuery<HTMLElement>) {
  const images = document.find('img');
  images.each((index, element) => {
    const $element = $(element);
    const src = $element.attr('src');
    const httpProtocolUrlRegex = /^(http|https):\/\/([\w.]+\/?)\S*/;
    if (!httpProtocolUrlRegex.test(src)) {
      // console.log(element.attributes);
      $.each(element.attributes, (indexInArray, attr) => {
        if (httpProtocolUrlRegex.test(attr.value)) {
          // console.log(attr.value);
          $element.attr('src', attr.value);
        }
      });
    }
  });
}

/**
 * Extract html content by rule or general extractor.
 * @param url
 * @param html
 */
export async function extract(url: string, html: string): Promise<IExtractResult> {
  // TODO extract needed value.
  const styles = await getCurrentPageCSS();
  console.log(styles);
  const document = $(`<div>${html}</div>n`);
  imagePreProcessor(document);
  inlineStyle(document, styles);
  let result: IExtractResult = {
    source: url,
    document,
    html,
  };

  const extractor = fetchRule(url);

  if (extractor) {
    result = extractByRule(extractor, result);
  } else {
    // TODO:
    // general extractor works here.
  }


  return result;
}