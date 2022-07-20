import React, { memo } from 'react';
import './index.css';

function Item(props) {
  const myref = React.createRef();

  function handleMouse(flag) {
    if (flag === true) {
      myref.current.style.display = 'block';
    } else {
      myref.current.style.display = 'none';
    }
  }

  function handleChange(id) {
    return (event) => {
      props.updateTodo(id, event.target.checked);
    };
  }

  function handleDelete(id) {
    if (window.confirm('确定删除吗？')) {
      props.deleteTodo(id);
    }
    return;
  }

  let { id, name, done } = props;

  return (
    <li
      onMouseEnter={() => {
        handleMouse(true);
      }}
      onMouseLeave={() => {
        handleMouse(false);
      }}
    >
      <label>
        <input type="checkbox" checked={done} onChange={handleChange(id)} />
        <span>{name}</span>
      </label>
      <button
        ref={myref}
        className="btn btn-danger"
        style={{ display: 'none' }}
        onClick={() => {
          handleDelete(id);
        }}
      >
        删除
      </button>
    </li>
  );
}

export default memo(Item);
