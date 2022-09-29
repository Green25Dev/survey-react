import React from 'react'
import '../App.css'

function Layout(props) {
  return (
    <div className="App">
      <div className="App-layout">
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
