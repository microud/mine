import * as $ from 'jquery';
import { IExtractResult } from './extractor';
import { extractByRule, fetchRule } from './rules';
import * as css from 'css';
import { Declaration, Rule, StyleRules } from 'css';
import { getCurrentPageCSS } from '../utils';

function inlineStyle(document: JQuery<HTMLElement>, linkedStyle?: string) {
  const $styles = document.find('style');
  console.log($styles);
  let styles = $styles.text();
  if (linkedStyle) {
    styles = linkedStyle + styles;
  }
  console.log(styles);
  const ast = css.parse(styles);
  console.log(ast);
  for (const rule of ast.stylesheet.rules) {
    if (rule.type === 'rule') {
      const selector = (rule as Rule).selectors.filter(selector => /:{1,2}/.test(selector) === false).join(',');
      const style = (rule as Rule).declarations
        .map((declaration: Declaration) => {
          document.find(selector).css(declaration.property, declaration.value);
        });
    }
  }
  $styles.remove();
  document.find('link').remove();
  document.find('meta').remove();
  document.find('script').remove();
}

export async function extract(url: string, html: string): Promise<IExtractResult> {
  // TODO extract needed value.
  const styles = await getCurrentPageCSS();
  const document = $(`<div>${html}</div>n`);
  inlineStyle(document, styles);
  console.log(document.html());
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
    //  general extractor works here.
  }


  return result;
}