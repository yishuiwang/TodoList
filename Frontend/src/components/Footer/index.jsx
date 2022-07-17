import React, { Component } from 'react';
import PubSub from 'pubsub-js'

import './index.css';
export default class Footer extends Component {
  

  state={
    all:3,
    complete:2,
  }

  checkAll = (event) => {
   PubSub.publish('checkall',event.target.checked)
  };

  clearAll = (event) => {
    PubSub.publish('clearAll',event.target.checked)
  };

  componentDidMount(){
    PubSub.subscribe('todos',(_,todos)=>{
      let {all,complete}=this.state
      all = todos.length;
      complete = 0;
      for (var i in todos) {
        if (todos[i].done) complete++;
      }
      this.setState({all,complete})
    })
  }

  render() {
    let {all,complete}=this.state
    return (
      <div className="todo-footer">
        <label>
          <input
            type="checkbox"
            checked={complete === all && all !== 0 ? true : false}
            onChange={this.checkAll}
          />
        </label>
        <span>
          <span>已完成{complete}</span> / 全部{all}
        </span>
        <button className="btn btn-danger" onClick={this.clearAll}>
          清除已完成任务
        </button>
      </div>
    );
  }
}
