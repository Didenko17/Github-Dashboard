import React from 'react';
import './App.css';
import {AppRedirect} from './components/AppRedirect';
import {Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Link className='header-link' to='/'><h1>Github Dashboard</h1></Link>
      <AppRedirect/>
    </div>
  );
}
export default App;
