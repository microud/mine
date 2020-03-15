import * as React from 'react';
import { useEffect, useState } from 'react';
import { getCurrentTabHTML } from '../utils';
import { extract } from '../extractor';
import './CleanMode.less';

export function CleanMode() {
  const [ html, setHTML ] = useState('');
  const [ title, setTitle ] = useState('');

  useEffect(() => {
    getCurrentTabHTML().then(result => {
      extract(result.url, result.html).then(extractResult => {
        setHTML(extractResult.content);
        setTitle(extractResult.title);
      });

      // const targetPlatform = platform['evernote'];
      // const adapter = new targetPlatform.adapter({});
      // adapter.publish(extractResult);
    });
  });
  return (
    <div id="clean-mode">
      <div className="meta">
        <div className="title">{title}</div>
        <div className="tags">Tags</div>
        <div className="category">Category</div>
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: html }}/>
      <div className="toolbar">
        <div className="left">
          <div>印象笔记</div>
          <div>All</div>
          <div>Styled</div>
          <div>HTML</div>
          <div>Text</div>
        </div>
        <div className="right">Setting</div>
      </div>
    </div>
  );
}