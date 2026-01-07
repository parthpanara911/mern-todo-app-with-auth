import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/addtask.css";
import { taskApi } from "../services/api/taskApi.js";

export default function UpdateTask() {
  const [taskData, setTaskData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getTask(id);
  }, [id]);

  const getTask = async (taskId) => {
    try {
      const task = await taskApi.getTask(taskId);
      if (task.success && task.result) {
        setTaskData(task.result);
      }
    } catch (error) {
      console.error("Get task error:", error);
    }
  };

  const updateTask = async () => {
    if (!taskData.title || !taskData.description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const task = await taskApi.updateTask(taskData);
      if (task.success) {
        navigate("/");
      } else {
        alert("Try after sometime");
      }
    } catch (error) {
      console.error("Update task error:", error);
      alert("Try after sometime");
    }
  };

  return (
    <div className="container">
      <h1>Update Task</h1>

      <label htmlFor="title">Title</label>
      <input
        value={taskData?.title || ""}
        onChange={(event) =>
          setTaskData({ ...taskData, title: event.target.value })
        }
        type="text"
        name="title"
        placeholder="Enter task title"
      />
      <label htmlFor="description">Description</label>
      <textarea
        value={taskData?.description || ""}
        onChange={(event) =>
          setTaskData({ ...taskData, description: event.target.value })
        }
        rows={4}
        name="description"
        placeholder="Enter task description"
      />
      <button onClick={updateTask} className="submit">
        Update Task
      </button>
    </div>
  );
}

