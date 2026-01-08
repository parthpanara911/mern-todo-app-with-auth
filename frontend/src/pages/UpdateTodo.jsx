import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/addtodo.css";
import { todoApi } from "../services/api/todoApi.js";

export default function UpdateTodo() {
  const [todoData, setTodoData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    document.title = "Update Todo - Todo App";
  }, []);

  useEffect(() => {
    getTodo(id);
  }, [id]);

  const getTodo = async (todoId) => {
    try {
      const todo = await todoApi.getById(todoId);
      if (todo.success && todo.data) {
        setTodoData(todo.data);
      } else {
        alert(todo.error || "Failed to load todo");
      }
    } catch (error) {
      console.error("Get todo error:", error);
      alert("Failed to load todo");
    }
  };

  const updateTodo = async () => {
    if (!todoData.title || !todoData.description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const { _id, userId, createdAt, updatedAt, ...updateData } = todoData;
      const todo = await todoApi.update(id, updateData);
      if (todo.success) {
        navigate("/");
      } else {
        alert(todo.error || "Failed to update todo");
      }
    } catch (error) {
      console.error("Update todo error:", error);
      alert("Failed to update todo");
    }
  };

  return (
    <div className="container">
      <h1>Update Todo</h1>

      <label htmlFor="title">Title</label>
      <input
        value={todoData?.title || ""}
        onChange={(event) =>
          setTodoData({ ...todoData, title: event.target.value })
        }
        type="text"
        name="title"
        placeholder="Enter todo title"
      />
      <label htmlFor="description">Description</label>
      <textarea
        value={todoData?.description || ""}
        onChange={(event) =>
          setTodoData({ ...todoData, description: event.target.value })
        }
        rows={4}
        name="description"
        placeholder="Enter todo description"
      />
      <button onClick={updateTodo} className="submit">
        Update Todo
      </button>
    </div>
  );
}

