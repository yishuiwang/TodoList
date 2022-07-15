import React, { Component } from 'react';
import './index.css';
export default class Footer extends Component {
  checkAll = (event) => {
    console.log('sbsz');
    console.log(event.target.checked);
    this.props.checkAll(event.target.checked);
  };

  clearAll = () => {
    this.props.clearAll()
  };

  render() {
    let { todos } = this.props;

    let all = todos.length;
    let complete = 0;
    for (var i in todos) {
      if (todos[i].done) complete++;
    }

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
