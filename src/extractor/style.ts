import * as postcss from 'postcss';
import * as $ from 'jquery';

/**
 * Convert all page style to inline style.
 * @param document
 * @param linkedStyle
 */
export function inlineStyle(document: JQuery<HTMLElement>, linkedStyle?: string) {
  const processor = postcss();
  const $styles = document.find('style');
  let styles = $styles.text();
  if (linkedStyle) {
    styles = linkedStyle + styles;
  }
  const ast = processor.process(styles); // css.parse(styles);

  for (const rule of ast.root.nodes) {
    if (rule.type === 'rule') {
      // Generate selector of current rule.
      const selector = (rule as postcss.Rule).selectors.filter(selector => /(:{1,2}|@)/.test(selector) === false).join(',');
      // Get style declarations.
      const elements = document.find(selector);
      elements.each((index, element) => {
        const $element = $(element);
        const oldStyles = $element.attr('style') || '';
        for (const node of (rule as postcss.Rule).nodes as postcss.Declaration[]) {
          $element.css(node.prop, node.value);
        }
        const oldDeclarations = oldStyles.split(';')
          .filter(d => !!d)
          .map(d => {
            const declarationArray = d.split(':');
            return {
              prop: declarationArray[0]?.trim(),
              value: declarationArray[1]?.trim()
            };
          });
        for (const declaration of oldDeclarations) {
          $element.css(declaration.prop, declaration.value);
        }
      });
    }
  }
  $styles.remove();
  document.find('link').remove();
  document.find('meta').remove();
  document.find('script').remove();
}