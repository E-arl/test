import React, { useEffect, useState } from "react";
import { data } from "./data";
import { Link } from "react-router-dom";
import {
  MdAddTask,
  MdSkipPrevious,
  MdSkipNext,
  MdDelete,
  MdClose,
  MdDone,
  MdContrast,
  MdCircle,
} from "react-icons/md";

const TodoList = ({ }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("");
  const [loading, setLoading] = useState(true);

  const [newTodo, setNewTodo] = useState(""); // For adding new items
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [editingId, setEditingId] = useState(null); // For editing items
  const [editingTitle, setEditingTitle] = useState(""); // For the edit input

  

  // Load initial data
  useEffect(() => {
    setItems(data);
    setFilteredItems(data);
    setLoading(false);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let updatedItems = items;

    // Filter by completion status
    if (filterCompleted !== "") {
      updatedItems = updatedItems.filter(
        (item) => item.completed === (filterCompleted === "true")
      );
    }

    // Search by title
    if (searchTerm.trim() !== "") {
      updatedItems = updatedItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(updatedItems);
    setCurrentPage(0); // Reset to first page on new filter/search
  }, [searchTerm, filterCompleted, items]);

  // Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );


  // Add new item
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newItem = {
        userId: 1,
        id: items.length + 1,
        title: newTodo,
        completed: false,
      };
      setItems((prev) => [newItem, ...prev]);
      setNewTodo("");
      setIsModalOpen(false); // Close modal after adding
    }
  };

  // Delete an item
  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Edit an item
  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleSaveEdit = () => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, title: editingTitle } : item
      )
    );
    setEditingId(null);
    setEditingTitle("");
  };

  // Toggle completion status
  const toggleCompletion = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Pagination handlers
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div className="flex flex-col place items-center p-5">
        {/* <h1 className="text-3xl">A To-Do List App</h1> */}
        <div className="flex gap-10 mt-3">
          <a
            href="/ErrorPage"
            className="bg-teal-400 text-black p-2 rounded-[5px] transition transform active:scale-95"
          >
            404 Page
          </a>
          <a
            href="./ErrorBoundary"
            onClick={() => triggerError(true)}
            className="bg-teal-400 text-black p-2 rounded-[5px] transition transform active:scale-95"
          >
            Error Boundary
          </a>
        </div>
      </div>

      {/* Modal for Adding New Todo */}
      {isModalOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-700 p-5 shadow-lg z-50 bg-opacity-50 backdrop-blur-sm rounded-[5px]">
          <h2 className="flex justify-center text-lg font-semibold p-3 text-teal-950">
            Add a new task{" "}
          </h2>
          <input
            className="bg-teal-200 p-2 rounded-[5px] placeholder-teal-500"
            type="text"
            placeholder="Enter to-do..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            style={{ marginBottom: "10px", display: "block" }}
          />
          <div className="flex justify-center gap-10 p-3">
            <button
              onClick={handleAddTodo}
              style={{ marginRight: "10px" }}
              className="bg-teal-300 text-black py-2 px-4 rounded transition transform active:scale-95"
            >
              <MdDone className="h-6 w-8 text-teal-950 hover:rotate-45 transition transform active:scale-95" />
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-teal-300 text-black py-2 px-4 rounded transition transform active:scale-95"
            >
              <MdClose className="h-6 w-8 text-teal-950 hover:rotate-45 transition transform active:scale-95" />
            </button>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex flex-row justify-center gap-5 ml-5 mr-5">
        <input
          id="search-bar"
          type="text"
          placeholder="Find items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-teal-400 p-2 w-[50%] rounded-[10px] mt-3 outline-none shadow-md placeholder-teal-900 "
        />
        <div className=" bg-teal-400 flex flex-row justify-center place-items-center rounded-[10px] shadow-md p-2 h-10 mt-4">
          <button onClick={() => setIsModalOpen(true)} className="text-1xl">
            <MdAddTask className="h-6 w-8 text-teal-950 hover:rotate-45 transition transform active:scale-95" />
          </button>
        </div>

        <select
          value={filterCompleted}
          onChange={(e) => setFilterCompleted(e.target.value)}
          className="bg-teal-400 rounded-[10px] shadow-md p-2 h-10 mt-4"
        >
          <option value="dropdown-menu">All</option>
          <option className="bg-teal-200" value="true">
            Completed
          </option>
          <option className="bg-teal-200" value="false">
            Not Completed
          </option>
        </select>
      </div>

      {/* Items List */}
      <div className="mt-10 ml-5 mr-5 ">
        {loading ? (
          <div>Loading...</div>
        ) : currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="mt-5 bg-teal-400 hover:bg-teal-100 border rounded-[10px]  shadow-md p-3 text-center"
            >
              {editingId === item.id ? (
                <div className="p-4">
                  <input
                    className="bg-teal-200 p-2 rounded-[5px]"
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                  <div className="flex justify-center gap-10 p-6">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-teal-300 text-black py-2 px-4 rounded transition transform active:scale-95"
                    >
                      <MdDone className="h-6 w-8 text-teal-950 hover:rotate-45 transition transform active:scale-95" />{" "}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-teal-300 text-black py-2 px-4 rounded transition transform active:scale-95"
                    >
                      <MdClose className="h-6 w-8 text-teal-950 hover:rotate-45 transition transform active:scale-95" />{" "}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-1">
                  <h3>
                    <Link
                      to={`/todo/${item.id}`}
                      className="text-teal-950 font-bold hover:underline"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  {/* Display the userId */}
                  <p className="text-teal-950 font-medium">
                    User ID: {item.userId}
                  </p>
                  <p className="flex justify-center p-2">
                    {item.completed ? (
                      <MdCircle className="text-teal-950 w-7 h-10" />
                    ) : (
                      <MdContrast className="text-teal-950 w-7 h-10" />
                    )}
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => toggleCompletion(item.id)}
                      className="bg-teal-500 text-black py-2 px-4 rounded transition transform active:scale-95"
                    >
                      {item.completed
                        ? "Mark as Incomplete"
                        : "Mark as Complete"}
                    </button>
                    <button
                      onClick={() => handleEdit(item.id, item.title)}
                      className="bg-teal-500 text-black py-2 px-4 rounded transition transform active:scale-95"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)}>
                      <MdDelete className="h-8 w-8 text-teal-950 hover:rotate-45 transition transform active:scale-95" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center">No items found</div>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredItems.length > itemsPerPage && (
        <div className="flex flex-col place items-center p-5">
          <div className="flex justify-center gap-4">
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className="bg-teal-500 text-black py-2 px-4 rounded transition transform active:scale-95"
            >
              <MdSkipPrevious className="h-7 w-7 text-teal-950 transition transform active:scale-95" />
            </button>
            <p className="p-3">
              Page {currentPage + 1} of {totalPages}
            </p>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className="bg-teal-500 text-black py-2 px-4 rounded transition transform active:scale-95"
            >
              <MdSkipNext className="h-7 w-7 text-teal-950 transition transform active:scale-95" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
