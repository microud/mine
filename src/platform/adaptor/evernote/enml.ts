import * as $ from 'jquery';
import elements = chrome.devtools.panels.elements;

const permittedElements = [
  'abbr', 'acronym', 'address', 'area', 'tt', 'bdo', 'big', 'blockquote', 'dl',
  'br', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'dd', 'del',
  'dfn', 'div', 'a', 'dt', 'em', 'font', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'hr', 'i', 'img', 'ins', 'kbd', 'li', 'map', 'ol', 'p', 'pre', 'q', 'xmp',
  'small', 'span', 'strike', 'strong', 'sub', 'sup', 'table', 'tbody', 'td',
  'tfoot', 'th', 'thead', 'title', 'tr', 'b', 'u', 'ul', 'var', 's', 'samp',
];

const prohibitedElements = [
  'applet', 'base', 'basefont', 'bgsound', 'blink', 'body', 'button',
  'dir', 'embed', 'fieldset', 'form', 'frame', 'frameset', 'head', 'html', 'iframe',
  'ilayer', 'input', 'isindex', 'label', 'layer,', 'legend', 'link', 'xml',
  'marquee', 'menu', 'meta', 'noframes', 'noscript', 'object', 'optgroup',
  'option', 'param', 'plaintext', 'script', 'select', 'style', 'textarea',
];

function traverseProcess(elements: JQuery<HTMLElement>) {
  elements.each((index, element) => {
    // console.log(element);
    const $element = $(element);
    if ($element.children().length) {
      traverseProcess($element.children());
    }
    if (prohibitedElements.indexOf(element.tagName?.toLowerCase()) !== -1) {
      // $element.replaceWith(`<div>${$element.html()}</div>`);
      console.log(element, 'will be removed');
      $element.remove();
    }
  });
}

export function convert(document: JQuery<HTMLElement> | string): string {
  if (typeof document === 'string') {
    document = $(document);
  }
  const template = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<!DOCTYPE en-note SYSTEM "http://xml.evernote.com/pub/enml2.dtd">' +
    '<en-note>{{ body }}</en-note>';
  document.each((index, element) => {
    console.log(index);
    const $element = $(element);
    $element.off();
    [ 'id', 'class', 'accesskey', 'data', 'dynsrc', 'tabindex' ]
      .map(attr => $element.removeAttr(attr));

    // Change prohibited element tag name to div.
    // if (prohibitedElements.indexOf(element.tagName) !== -1) {
    //   $element.replaceWith(`<div>${$element.html()}</div>`);
    // }
    traverseProcess(document as JQuery<HTMLElement>);
  });

  console.log(document);

  let body = '';

  document.each((index, element) => {
    body += element.outerHTML;
  });

  return template.replace('{{ body }}', body);
}