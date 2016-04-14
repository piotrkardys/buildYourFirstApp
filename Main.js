import React from 'react';
import SearchGithub from './SearchGithub';

const Main = (props) => {
  return (
    <div className="main-container">
      <nav className="navbar navbar-default" role="navigation">
        <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
          <SearchGithub history={props.history}/>
        </div>
      </nav>
      <div className="container">
        {props.children}
      </div>
    </div>
  )
};

export default Main;
