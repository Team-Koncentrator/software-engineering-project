import React from 'react';
import './App.css';
import Button from './components/Button/Button';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
        <Button name='click'>Clikck</Button>
      </header>
    </div>
  );
}

export default App;
