import * as $ from 'jquery';
import { IExtractResult } from './extractor';
import { extractByRule, fetchRule } from './rules';
import * as css from 'css';
import { Declaration, Rule, StyleRules } from 'css';
import { getCurrentPageCSS } from '../utils';

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
 * Convert all page style to inline style.
 * @param document
 * @param linkedStyle
 */
function inlineStyle(document: JQuery<HTMLElement>, linkedStyle?: string) {
  const $styles = document.find('style');
  let styles = $styles.text();
  if (linkedStyle) {
    styles = linkedStyle + styles;
  }
  const ast = css.parse(styles);
  for (const rule of ast.stylesheet.rules) {
    if (rule.type === 'rule') {
      // Generate selector of current rule.
      const selector = (rule as Rule).selectors.filter(selector => /(:{1,2}|@)/.test(selector) === false).join(',');
      // Get style declarations.
      const elements = document.find(selector);
      elements.each((index, element) => {
        const $element = $(element);
        const oldStyles = $element.attr('style') || '';
        for (const declaration of (rule as Rule).declarations as Declaration[]) {
          $element.css(declaration.property, declaration.value);
        }
        const oldDeclarations = oldStyles.split(';')
          .filter(d => !!d)
          .map(d => {
            const declarationArray = d.split(':');
            return {
              property: declarationArray[0].trim(),
              value: declarationArray[1].trim()
            };
          });
        for (const declaration of oldDeclarations) {
          $element.css(declaration.property, declaration.value);
        }
      });
    }
  }
  $styles.remove();
  document.find('link').remove();
  document.find('meta').remove();
  document.find('script').remove();
}

/**
 * Extract html content by rule or general extractor.
 * @param url
 * @param html
 */
export async function extract(url: string, html: string): Promise<IExtractResult> {
  // TODO extract needed value.
  const styles = await getCurrentPageCSS();
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