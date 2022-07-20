import React, { useEffect } from 'react';
import PubSub from 'pubsub-js';

import './index.css';

export default function Footer() {
  const [total, setTotal] = React.useState(3);
  const [finished, setfinished] = React.useState(2);

  function checkAll(event) {
    PubSub.publish('checkall', event.target.checked);
  }

  function clearAll(event) {
    PubSub.publish('clearAll', event.target.checked);
  }

  useEffect(() => {
    PubSub.subscribe('todos', (_, todos) => {
      let total = todos.length;
      let finished = 0;
      for (var i in todos) {
        if (todos[i].done) finished++;
      }
      setfinished(finished);
      setTotal(total);
    });
  }, []);

  return (
    <div className="todo-footer">
      <label>
        <input
          type="checkbox"
          checked={finished === total && total !== 0 ? true : false}
          onChange={checkAll}
        />
      </label>
      <span>
        <span>已完成{finished}</span> / 全部{total}
      </span>
      <button className="btn btn-danger" onClick={clearAll}>
        清除已完成任务
      </button>
    </div>
  );
}
