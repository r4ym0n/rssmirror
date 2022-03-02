// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [account, setAccount] = useState("");

  const onClick = () => {
    console.log("clicked");
    document.location.href = "/" + account;
  }

  const onChange = (event) => {
    console.log(event.target.value);
    setAccount(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex" }}>
          <h1>
            The RSS of Mirror
          </h1>
          <img src='/rss.png' className='rss-logo' alt='rsslogo'/>

        </div>

        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>Edit <code>src/App.js</code> and save to reload.</p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <div style={{ display: "flex", width: "700px" }}>
          <input type="text" placeholder='Here,Mirror Addr' className='App-input-account' 
            value={account} 
            onChange={onChange} 
            maxLength={50}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClick();
              }}}
          />
          <button className='App-button' onClick={onClick} >Click me</button>
        </div>
      </header>
    </div>
  );
}

export default App;
