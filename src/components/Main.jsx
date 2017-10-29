import React from 'react';

import './Main.css';
import DropArea from '../containers/DropArea';

const Main = ()=>{
  return (
    <div className='Main'>
      <header className="header">
        <h1 className="logo">SnapImage</h1>
      </header>
      <DropArea />
    </div>
  );
}

export default Main;
