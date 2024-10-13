import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../utils/constant';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(`${baseURL}/get`);
  return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await axios.post(`${baseURL}/save`, { toDo: todo });
  return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, todo }) => {
  const response = await axios.put(`${baseURL}/update/${id}`, { toDo: todo });
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${baseURL}/delete/${id}`);
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo._id === action.payload._id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        return state.filter(todo => todo._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;