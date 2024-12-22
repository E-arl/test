import TodoList from "./TodoList.jsx";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import TodoDetail from "./TodoDetail.jsx";
import { data } from "./data";

const App = () => {
  const [items, setItems] = useState(data);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<TodoList items={items} setItems={setItems} />}
        />
        <Route path="/ErrorPage" element={<ErrorPage />} />
        <Route path="/ErrorBoundary" element={<ErrorBoundary />} />
        <Route
          path="/todo/:id"
          element={<TodoDetail items={items} setItems={setItems} />}
        />
      </Routes>
    </>
  );
};

export default App;
