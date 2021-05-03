import React from 'react';
import ScrumBoard from './components/Main'
import BoardContext from './components/context/BoardContext'


function App() {
  return (
    <BoardContext>
      <ScrumBoard />
    </BoardContext>
  );
}

export default App;
