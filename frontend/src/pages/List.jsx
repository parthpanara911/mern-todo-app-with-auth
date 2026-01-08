import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/list.css";
import { todoApi } from "../services/api/todoApi.js";

export default function List() {
  const [todoData, setTodoData] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState([]);

  useEffect(() => {
    document.title = "Todo List - Todo App";
  }, []);

  useEffect(() => {
    getListData(); // Called when component inserted into DOM 
  }, []);

  const getListData = async () => {
    const response = await todoApi.getAll();
    if (response.success) {
      setTodoData(response.data);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await todoApi.delete(id);
      if (response.success) {
        getListData();
      } else {
        alert(response.error || "Failed to delete todo");
      }
    } catch (error) {
      console.error("Delete todo error:", error);
      alert("Failed to delete todo");
    }
  };

  const selectAll = (event) => {
    if (event.target.checked) {
      const items = todoData.map((item) => item._id);
      setSelectedTodo(items);
    } else {
      setSelectedTodo([]);
    }
  };

  const selectSingleItem = (id) => {
    if (selectedTodo.includes(id)) {
      const items = selectedTodo.filter((item) => item !== id);
      setSelectedTodo(items);
    } else {
      setSelectedTodo([...selectedTodo, id]);
    }
  };

  const deleteMultiple = async () => {
    if (selectedTodo.length === 0) {
      alert("Please select at least one task to delete");
      return;
    }
    try {
      const response = await todoApi.deleteMultiple(selectedTodo);
      if (response.success) {
        getListData();   // Refresh list
        setSelectedTodo([]); // Clear selection
      } else {
        alert(response.error || "Failed to delete todos");
      }
    } catch (error) {
      console.error("Delete multiple todos error:", error);
      alert("Failed to delete todos");
    }
  };

  return (
    <div className="list-container">
      <h1>To Do List</h1>
      <button onClick={deleteMultiple} className="delete-item delete-multiple">
        Delete
      </button>
      <ul className="task-list">
        <li className="list-header">
          <input onChange={selectAll} type="checkbox" />
        </li>
        <li className="list-header">S.No</li>
        <li className="list-header">Title</li>
        <li className="list-header">Description</li>
        <li className="list-header">Action</li>

        {todoData &&
          todoData.map((item, index) => (
            <Fragment key={item._id}>
              <li className="list-item">
                <input
                  onChange={() => selectSingleItem(item._id)}
                  checked={selectedTodo.includes(item._id)}
                  type="checkbox"
                />
              </li>
              <li className="list-item">{index + 1}</li>
              <li className="list-item">{item.title}</li>
              <li className="list-item">{item.description}</li>
              <li className="list-item">
                <button
                  onClick={() => deleteTodo(item._id)}
                  className="delete-item"
                >
                  Delete
                </button>
                <Link to={`update/${item._id}`} className="update-item">
                  Update
                </Link>
              </li>
            </Fragment>
          ))}
      </ul>
    </div>
  );
}

