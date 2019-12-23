import React, { Component } from 'react';
import  {Example} from './test.js'
import  {SearchComponnent, Navbar} from './HomePage.js'


export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.responseData = null;
  }

  render() {
    return (
      <div>
      <header >
        <Navbar/>
      </header>
      <main role="main">
      <SearchComponnent/>
      </main>
      </div>
  );  
  }
}