import React from 'react'

function Progress(props) {

  return (
    <>
      <div className="App-my-progress">
        <div className="App-my-bar" style={{ width: props.percent + '%' }}></div>
      </div>
    </>
  );
}

export default Progress;
