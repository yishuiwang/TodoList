import React, { Component } from 'react';
import PubSub from 'pubsub-js'

import './index.css';

export default class Header extends Component {
  handleKeyUp = (event) => {
    let { target, keyCode } = event;
    if (keyCode !== 13) return;
    if (target.value.trim() === '') {
      alert('输入不能为空');
      return;
    }
    PubSub.publish('addTodo', target.value);
    target.value = '';
  };

  render() {
    return (
      <div className="todo-header">
        <input
          type="text"
          placeholder="请输入你的任务，回车确认"
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
}
