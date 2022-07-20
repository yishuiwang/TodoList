import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import PubSub from 'pubsub-js';
import './index.css';
import Item from '../Item';

export default function List() {
  const [todos, setTodos] = React.useState([
    { id: '001', name: '吃饭', done: true },
    { id: '002', name: '睡觉', done: false },
    { id: '003', name: '敲代码', done: true },
  ]);

  useEffect(() => {
    const checkAll = () => {
      PubSub.subscribe('checkall', (_, flag) => {
        let newTodos = todos.map((value) => {
          value.done=flag
          return value
        });
        setTodos(newTodos);
      });
    };
    checkAll();

    const addTodo = () => {
      PubSub.subscribe('addTodo', (_, name) => {
        let todoObj = { id: nanoid(), name: name, done: false };
        let newTodos = [todoObj, ...todos];
        setTodos(newTodos);
      });
    };
    addTodo();

    const clearAll = () => {
      PubSub.subscribe('clearAll', () => {
        let newTodos = todos.filter((todoObj) => {
          return todoObj.done === false;
        });
        setTodos(newTodos);
      });
    };
    clearAll();
  }, [todos]);

  useEffect(() => {
    PubSub.publish('todos', todos);
  });

  function deleteTodo(id) {
    let newTodos = todos;
    newTodos = newTodos.filter((todoObj) => {
      return todoObj.id !== id;
    });
    setTodos(newTodos);
  }

  function updateTodo(id, done) {
    let newTodos = todos.map((todoObj) => {
      if (todoObj.id === id) return { ...todoObj, done };
      else return todoObj;
    });
    setTodos(newTodos);
  }

  return (
    <ul className="todo-main">
      {todos.map((todo) => {
        return (
          <Item
            key={todo.id}
            {...todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        );
      })}
    </ul>
  );
}
