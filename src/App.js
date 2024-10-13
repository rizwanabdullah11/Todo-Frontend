import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './redux/todoSlice';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchTodos());
    }
  }, [dispatch, user]);

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Todo App</h1>
          <nav>
            {user ? (
              <>
                <Link to="/">Home</Link>
                <button onClick={() => dispatch({ type: 'auth/logout' })}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={user ? (
              <>
                <TodoForm onSubmit={(todo) => dispatch(addTodo(todo))} />
                <TodoList
                  onUpdate={(id, todo) => dispatch(updateTodo({ id, todo }))}
                  onDelete={(id) => dispatch(deleteTodo(id))}
                />
              </>
            ) : (
              <p>Please sign in to view and manage your todos.</p>
            )} />
            <Route path="/Signin" element={<SignIn />} />
            <Route path="/Signup" element={<SignUp />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
