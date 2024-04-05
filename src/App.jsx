import React, { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo, editTodo } from './Store';

const App = () => {
  const [todoText, setTodoText] = useState('');
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (todoText.trim() !== '') {
      dispatch(addTodo({
        id: Math.random() * 1000,
        text: todoText,
      }));
      setTodoText('');
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo({ id }));
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo({ id }));
  };

  const handleEditTodo = (id, newText) => {
    dispatch(editTodo({ id, text: newText }));
  };

  const handleCheckboxToggle = (id) => {
    dispatch(toggleTodo({ id }));
  };

  return (
    <div>
      <input type="text" className="form-control" placeholder="Input for Output" aria-label="I/P for O/P" aria-describedby="basic-addon2" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
      <button className="btn btn-outline-secondary" type="button" onClick={handleAddTodo}>Add</button>
      <br />
      <br />
      <div>
        {todos &&
          todos.map((todo) => (
            <div key={todo.id} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleCheckboxToggle(todo.id)}
              />
              <p>{todo.id} {todo.text}</p>
              <button type="button" className="btn btn-danger" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              <button type="button" className="btn btn-secondary" onClick={() => handleToggleTodo(todo.id)}>Toggle</button>
              <button type="button" className="btn btn-info" onClick={() => handleEditTodo(todo.id, prompt('Enter new text', todo.text))}>Edit</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
