import * as $ from 'jquery';
import { IExtractOption, IExtractResult } from './extractor';
import { extractByRule, fetchRule } from './rules';
import { getCurrentPageCSS } from '../utils';
import { inlineStyle } from './style';
// @ts-ignore
const Readability = require('./general/Readability');

/**
 * Pre process for lazy load images.
 * TODO Checks for image elements that have an attribute that isn't an src or srcset,but looks like one, and replaces the src/srcset with that value (similar to what mercury-parser does).
 * TODO Checks for <figure> elements that have an attribute with a value that looks like an src/srcset, but that don't contain any image nodes. In this case, a new image will be created and added to inside the <figure>
 * reference https://github.com/mozilla/readability/pull/542
 * @param document
 */
function imagePreProcessor(document: HTMLDocument) {
  const images = $(document).find('img');
  images.each((index, element) => {
    const $element = $(element);
    const src = $element.attr('src');
    const httpProtocolUrlRegex = /^(http|https):\/\/([\w.]+\/?)\S*/;
    if (!httpProtocolUrlRegex.test(src)) {
      // console.log(element.attributes);
      $.each((element as any as HTMLElement).attributes, (indexInArray, attr) => {
        if (httpProtocolUrlRegex.test(attr.value)) {
          $element.attr('src', attr.value);
        }
      });
    }
    $element.css('visibility', 'visible');
  });
}

/**
 * Extract html content by rule or general extractor.
 * @param url
 * @param html
 */
export async function extract(url: string, html: string, option?: IExtractOption): Promise<IExtractResult> {
  // TODO extract needed value.
  const styles = await getCurrentPageCSS();
  console.log(styles);
  const parser = new DOMParser();
  const document = parser.parseFromString(html, 'text/html'); // $(`<div>${html}</div>n`);
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
    // const iframe = window.document.createElement('iframe');
    // iframe.src = `data:text/html;charset=utf-8,${escape(document.html())}`;
    // window.document.body.appendChild(iframe);

    const parser = new DOMParser();

    const doc = result.document;

    const article = new Readability(doc).parse();
    console.log(article);
    result.title = article.title;
    result.content = article.content;
    // general extractor works here.
  }


  return result;
}