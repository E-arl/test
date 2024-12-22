import React, { createContext, useState, useContext } from 'react';
import todosData from './data'; // Import static data

// Create a context for the todos
const TodoContext = createContext();

// TodoProvider to wrap the app and provide todos state
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(todosData); // Store todos in state

  // Function to toggle the completion status of a todo
  const toggleCompletion = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, toggleCompletion }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the TodoContext
export const useTodos = () => useContext(TodoContext);
