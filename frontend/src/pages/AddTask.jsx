import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/addtask.css";
import { taskApi } from "../services/api/taskApi.js";

export default function AddTask() {
  const [taskData, setTaskData] = useState({});
  const navigate = useNavigate();

  const handleAddTask = async () => {
    if (!taskData.title || !taskData.description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const result = await taskApi.createTask(taskData);
      if (result.success) {
        navigate("/");
      } else {
        alert("Try after sometime");
      }
    } catch (error) {
      console.error("Add task error:", error);
      alert("Try after sometime");
    }
  };

  return (
    <div className="container">
      <h1>Add New Task</h1>

      <label htmlFor="title">Title</label>
      <input
        onChange={(event) =>
          setTaskData({ ...taskData, title: event.target.value })
        }
        type="text"
        name="title"
        placeholder="Enter task title"
      />
      <label htmlFor="description">Description</label>
      <textarea
        onChange={(event) =>
          setTaskData({ ...taskData, description: event.target.value })
        }
        rows={4}
        name="description"
        placeholder="Enter task description"
      />
      <button onClick={handleAddTask} className="submit">
        Add New Task
      </button>
    </div>
  );
}

