import * as React from 'react';
import { useEffect, useState } from 'react';
import { getCurrentTabHTML } from '../utils';
import { extract } from '../extractor';
import './CleanMode.less';

export function CleanMode() {
  const [ html, setHTML ] = useState('');

  useEffect(() => {
    getCurrentTabHTML().then(result => {
      extract(result.url, result.html).then(extractResult => {
        setHTML(extractResult.content);
      });

      // const targetPlatform = platform['evernote'];
      // const adapter = new targetPlatform.adapter({});
      // adapter.publish(extractResult);
    });
  });
  return (
    <div id="clean-mode">
      <div className="title">content</div>
      <div className="content" dangerouslySetInnerHTML={{ __html: html }}/>
      <div className="toolbar">hi</div>
    </div>
  );
}