import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QuickMode } from './QuickMode';
import './App.css'
import { CleanMode } from './CleanMode';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        {/*TODO according status change component*/}
        <CleanMode />
      </div>
    );
  }
}

export function Render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}