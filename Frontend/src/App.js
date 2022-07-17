import React from 'react';

import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';

import './App.css';

class App extends React.Component {


  render() {
    // let { todos } = this.state;
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header />
          <List />
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
