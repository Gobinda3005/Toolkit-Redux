import { createSlice, configureStore } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: { todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ id: action.payload.id, text: action.payload.text });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, editTodo } = todoSlice.actions;

const store = configureStore({
  reducer: todoSlice.reducer,
});

export default store;
