import { Fragment } from 'react';

import './App.css';
import Input from './components/Input.js';
import List from './components/List.js';

function App() {
  return (
    <Fragment>
      <div className="container">
        <Input />
        <List/>
      </div>
    </Fragment>
  );
}

export default App;
