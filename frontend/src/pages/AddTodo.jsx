import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/addtodo.css";
import { todoApi } from "../services/api/todoApi.js";

export default function AddTodo() {
  const [todoData, setTodoData] = useState({});
  const navigate = useNavigate();

  const handleAddTodo = async () => {
    if (!todoData.title || !todoData.description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const result = await todoApi.create(todoData);
      if (result.success) {
        navigate("/");
      } else {
        alert("Try after sometime");
      }
    } catch (error) {
      console.error("Add todo error:", error);
      alert("Try after sometime");
    }
  };

  return (
    <div className="container">
      <h1>Add New Todo</h1>

      <label htmlFor="title">Title</label>
      <input
        onChange={(event) =>
          setTodoData({ ...todoData, title: event.target.value })
        }
        type="text"
        name="title"
        placeholder="Enter todo title"
      />
      <label htmlFor="description">Description</label>
      <textarea
        onChange={(event) =>
          setTodoData({ ...todoData, description: event.target.value })
        }
        rows={4}
        name="description"
        placeholder="Enter todo description"
      />
      <button onClick={handleAddTodo} className="submit">
        Add New Todo
      </button>
    </div>
  );
}

