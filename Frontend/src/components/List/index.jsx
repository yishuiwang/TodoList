import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PubSub from 'pubsub-js';
import './index.css';
import Item from '../Item';

export default class List extends Component {
  state = {
    todos: [
      { id: '001', name: '吃饭', done: true },
      { id: '002', name: '睡觉', done: false },
      { id: '003', name: '敲代码', done: true },
    ],
  };

  componentDidMount() {
    PubSub.subscribe('addTodo', (_, name) => {
      let todoObj = { id: nanoid(), name: name, done: false };
      let { todos } = this.state;
      let newTodos = [todoObj, ...todos];
      this.setState({ todos: newTodos });
    });

    PubSub.subscribe('checkall',(_, flag)=>{
      this.checkAll(flag)
    })

    PubSub.subscribe('clearAll',()=>{
      this.clearAll()
    })

  }

  componentDidUpdate() {
    PubSub.publish('todos', this.state.todos);
  }

  deleteTodo = (id) => {
    let { todos } = this.state;
    todos = todos.filter((todoObj) => {
      return todoObj.id !== id;
    });
    this.setState({ todos });
  };

  updateTodo = (id, done) => {
    let { todos } = this.state;
    let newTodos = todos.map((todoObj) => {
      if (todoObj.id === id) return { ...todoObj, done };
      else return todoObj;
    });
    this.setState({ todos: newTodos });
  };

  checkAll = (flag) => {
    let { todos } = this.state;
    for (var i in todos) {
      todos[i].done = flag;
    }

    this.setState({ todos });
  };

  clearAll = () => {
    let { todos } = this.state;
    todos = todos.filter((todoObj) => {
      return todoObj.done === false;
    });
    this.setState({ todos });
  };

  render() {
    let { todos } = this.state;
    return (
      <ul className="todo-main">
        {todos.map((todo) => {
          return (
            <Item
              key={todo.id}
              {...todo}
              deleteTodo={this.deleteTodo}
              updateTodo={this.updateTodo}
            />
          );
        })}
      </ul>
    );
  }
}
