import React from 'react';
import { Task1 } from './components/Task1';

function App() {
  return (
    <div className="container">
      <div>
        <img src={require('./public/task.JPG')} />
      </div>

      <Task1
        xMin={716}
        xMax={750}
        a={-1}
        b={1}
        p={751}
        k={11}
        l={5}
      />
    </div>
  );
}

export default App;
