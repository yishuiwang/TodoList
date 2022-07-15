import React from 'react';
import {nanoid} from 'nanoid'

import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';

import './App.css';

class App extends React.Component {
  state = {
    todos: [
      { id: '001', name: '吃饭', done: true },
      { id: '002', name: '睡觉', done: false },
      { id: '003', name: '敲代码', done: true },
    ],
  };

  getTodo = (name) => {
    let todoObj = { id: nanoid(), name: name, done: false };
    let { todos } = this.state;
    let newTodos = [todoObj, ...todos];
    this.setState({ todos: newTodos });
  };

  updateTodo = (id, done) => {
    let { todos } = this.state;
    let newTodos = todos.map((todoObj) => {
      if (todoObj.id === id) return { ...todoObj, done };
      else return todoObj;
    });
    this.setState({ todos: newTodos });
  };

  deleteTodo = (id) => {
    let { todos } = this.state;
    todos = todos.filter((todoObj) => {
      return todoObj.id !== id;
    });
    this.setState({ todos });
  };

  checkAll=(flag)=>{
    let { todos } = this.state;
    for(var i in todos){
      todos[i].done=flag
    }

    this.setState({todos})
  }

  clearAll=()=>{
    let { todos } = this.state;
    todos = todos.filter((todoObj) => {
      return todoObj.done === false;
    });
    this.setState({todos})
  }

  render() {
    let { todos } = this.state;
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header getTodo={this.getTodo} />
          <List
            todos={todos}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
          />
          <Footer todos={todos} checkAll={this.checkAll} clearAll={this.clearAll}/>
        </div>
      </div>
    );
  }
}

export default App;
