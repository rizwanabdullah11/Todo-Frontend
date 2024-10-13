import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      if (isEditing) {
        // Update existing todo
        const updatedTodos = todos.map((todo, index) =>
          index === currentTodoIndex ? input : todo
        );
        setTodos(updatedTodos);
        setIsEditing(false);
      } else {
        // Add new todo
        setTodos([...todos, input]);
      }
      setInput('');
    }
  };

  const handleEdit = (index) => {
    setInput(todos[index]);
    setCurrentTodoIndex(index);
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <header>
        <h1>TODO List</h1>
      </header>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your todo"
        />
        <button type="submit">{isEditing ? 'Update Todo' : 'Add Todo'}</button>
      </form>

      {isEditing && (
        <div className="update-view">
          <h3>Update ToDo</h3>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSubmit}>Update</button>
        </div>
      )}

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {todo}
            <div>
              <button onClick={() => handleEdit(index)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(index)} className="delete-btn">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
