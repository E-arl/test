import TodoList from "./TodoList";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import ErrorBoundary from "./ErrorBoundary";
import TodoDetail from "./TodoDetail";
import { data } from "./data";

type ItemType = typeof data[number]; // infer type from your data array

const App: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>(data);

  return (
    <Routes>
      <Route path="/" element={<TodoList items={items} setItems={setItems} />} />
      <Route path="/ErrorPage" element={<ErrorPage />} />
      <Route path="/ErrorBoundary" element={<ErrorBoundary children={""} />} />
      <Route path="/todo/:id" element={<TodoDetail items={items} setItems={setItems} />} />
    </Routes>
  );
};

export default App;
