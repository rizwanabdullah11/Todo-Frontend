import React from 'react';
import { useSelector } from 'react-redux';

const TodoList = ({ onUpdate, onDelete }) => {
  const todos = useSelector(state => state.todos);

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo._id} className="todo-item">
          <span>{todo.toDo}</span>
          <div>
            <button onClick={() => onUpdate(todo._id, prompt('Update todo:', todo.toDo))}>
              Edit
            </button>
            <button onClick={() => onDelete(todo._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;