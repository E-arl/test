import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const TodoDetail = ({ items }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the todo item based on the ID from the route params
  const todo = items.find((item) => item.id === parseInt(id));

  if (!todo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-teal-100">
        <h1 className="text-4xl font-bold text-teal-900 mb-5">
          Todo Not Found
        </h1>
        <button
          onClick={() => navigate("/")}
          className="mt-5 bg-teal-500 text-black py-2 px-4 rounded transition transform active:scale-95"
        >
          Back to Todo List
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-teal-100">
      <h1 className="text-4xl font-bold text-teal-900 mb-5">{todo.title}</h1>
      <p className="text-lg font-bold text-teal-700">
        User ID: <span>{todo.userId}</span>
      </p>

      <p className="text-lg font-semibold text-teal-700">
        Status: <span>{todo.completed ? "Completed" : "Not Completed"}</span>
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-5 bg-teal-500 text-black py-2 px-4 rounded transition transform active:scale-95"
      >
        Back to Todo List
      </button>
    </div>
  );
};

export default TodoDetail;
