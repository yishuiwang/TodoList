import React from 'react';
import PubSub from 'pubsub-js';

import './index.css';

export default function Header() {
  function handleKeyUp(event) {
    let { target, keyCode } = event;
    if (keyCode !== 13) return;
    if (target.value.trim() === '') {
      alert('输入不能为空');
      return;
    }
    PubSub.publish('addTodo', target.value);
    target.value = '';
  }

  return (
    <div className="todo-header">
      <input
        type="text"
        placeholder="请输入你的任务，回车确认"
        onKeyUp={handleKeyUp}
      />
    </div>
  );
}
