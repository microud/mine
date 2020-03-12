import * as $ from 'jquery';
import { IExtractResult } from './extractor';
import { extractByRule, fetchRule } from './rules';
import * as css from 'css';
import { Declaration, Rule, StyleRules } from 'css';
import { getCurrentPageCSS } from '../utils';

function inlineStyle(document: JQuery<HTMLElement>) {
  const $styles = document.find('style');
  console.log($styles);
  const styles = $styles.text();
  const ast = css.parse(styles);
  for (const rule of ast.stylesheet.rules) {
    if (rule.type === 'rule') {
      const selector = (rule as Rule).selectors.join(',');
      const style = (rule as Rule).declarations
        .map((declaration: Declaration) => {
          document.find(selector).css(declaration.property, declaration.value);
        });
    }
  }
}

export async function extract(url: string, html: string): Promise<IExtractResult> {
  // TODO extract needed value.
  const styles = await getCurrentPageCSS();
  console.log(styles);
  const document = $(`<div>${html}</div>n`);
  inlineStyle(document);
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