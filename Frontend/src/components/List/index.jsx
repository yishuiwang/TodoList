import React, { Component } from 'react';
import './index.css'
import Item from '../Item';

export default class List extends Component {
  render() {
    let {todos,updateTodo,deleteTodo}=this.props
    return (
      <ul className="todo-main">
        {
          todos.map((todo)=>{
            return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
          })
        }
      </ul>
    );
  }
}
