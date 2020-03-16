import { IExtractResult, IRule, ISiteRule } from './extractor';
import * as $ from 'jquery';

export const rules: ISiteRule[] = [
  {
    description: '掘金',
    url: /juejin.im\/post\/\w+/,
    title: {
      selector: '.article-area .article-title',
      exact: true,
    },
    author: {
      selector: '.author-info-block .username',
      exact: true,
    },
    datetime: {
      selector: '.author-info-block .time',
      exact: true,
    },
    content: {
      selector: '.article-area .article-content',
      exact: true,
    },
  },
  {
    description: '博客园',
    url: /cnblogs\.com\/\w+\/p\/\w+/,
    title: {
      head: true,
      selector: '#cb_post_title_url',
      exact: true,
    },
    author: {
      selector: '#topics > div > div.postDesc > a:nth-child(2)',
      exact: true,
    },
    datetime: {
      selector: '#post-datetime',
      exact: true,
    },
    content: {
      selector: '#topics > div > div.postBody',
      exact: true,
    },
  },
  {
    description: 'CSDN',
    url: /blog\.csdn\.net\/\w+\/article\/details\/\w+/,
    title: {
      selector: '#mainBox > main > div.blog-content-box > div > div > div.article-title-box > h1',
      exact: true,
    },
    author: {
      selector: '#uid',
    },
    datetime: {
      selector: '#mainBox > main > div.blog-content-box > div > div > div.article-info-box > div.article-bar-top > span.time',
    },
    content: {
      selector: '#article_content',
      exact: true,
    },
  },
  {
    description: '简书',
    url: /jianshu\.com\/p\/\w+/,
    title: 'h1._1RuRku',
    author: '.FxYr8x a._1OhGeD',
    datetime: '.s-dsoj time',
    content: 'article._2rhmJa',
  },
  {
    description: '微信',
    url: 'mp\.weixin\.qq\.com\/s',
    title: '#activity-name',
    author: '#js_name',
    datetime: '#publish_time',
    content: '#js_content'
  }
];

export function fetchRule(url) {
  for (const rule of rules) {
    if (typeof rule.url === 'string') {
      rule.url = new RegExp(rule.url);
    }
    if (rule.url.test(url)) {
      return rule;
    }
  }
  return null;
}

export function extractByRule(extractor: ISiteRule, tempResult: IExtractResult): IExtractResult {
  const result = {
    ...tempResult
  };
  const { document } = result;
  const entries: [ string, IRule ][] = Object.entries(extractor);
  for (const [ key, rule ] of entries) {
    const selector = (typeof rule === 'string') ? rule : rule.selector;
    switch (key) {
      case 'title':
        if (rule.head) {
          result[key] = $(document).find('head > title')?.text();
        } else if (rule.exact !== false) {
          result[key] = $(document).find(selector).html();
        }
        break;
      case 'datetime':
        result[key] = $(document).find(selector).html();
        break;
      case 'author':
        result[key] = $(document).find(selector).text();
        break;
      case 'content':
        result[key] = $(document).find(selector).html();
        break;
    }
  }
  return result;
}