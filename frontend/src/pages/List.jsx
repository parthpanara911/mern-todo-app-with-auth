import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/list.css";
import { todoApi } from "../services/api/todoApi.js";

export default function List() {
  const [taskData, setTaskData] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);

  useEffect(() => {
    getListData(); // Called when component inserted into DOM 
  }, []);

  const getListData = async () => {
    const response = await todoApi.getAll();
    if (response.success) {
      setTaskData(response.data);
    }
  };

  const deleteTask = async (id) => {
    const response = await todoApi.delete(id);
    if (response.success) {
      getListData();
    }
  };

  const selectAll = (event) => {
    if (event.target.checked) {
      const items = taskData.map((item) => item._id);
      setSelectedTask(items);
    } else {
      setSelectedTask([]);
    }
  };

  const selectSingleItem = (id) => {
    if (selectedTask.includes(id)) {
      const items = selectedTask.filter((item) => item !== id);
      setSelectedTask(items);
    } else {
      setSelectedTask([...selectedTask, id]);
    }
  };

  const deleteMultiple = async () => {
    if (selectedTask.length === 0) {
      alert("Please select at least one task to delete");
      return;
    }
    const response = await todoApi.deleteMultiple(selectedTask);
    if (response.success) {
      getListData();   // Refresh list
      setSelectedTask([]); // Clear selection
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

        {taskData &&
          taskData.map((item, index) => (
            <Fragment key={item._id}>
              <li className="list-item">
                <input
                  onChange={() => selectSingleItem(item._id)}
                  checked={selectedTask.includes(item._id)}
                  type="checkbox"
                />
              </li>
              <li className="list-item">{index + 1}</li>
              <li className="list-item">{item.title}</li>
              <li className="list-item">{item.description}</li>
              <li className="list-item">
                <button
                  onClick={() => deleteTask(item._id)}
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

