import { Routes, Route } from "react-router-dom";
import "./style/App.css";
import NavBar from "./components/NavBar.jsx";
import Protected from "./components/Protected.jsx";
import AddTodo from "./pages/AddTodo.jsx";
import List from "./pages/List.jsx";
import UpdateTodo from "./pages/UpdateTodo.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <List />
            </Protected>
          }
        />
        <Route
          path="/add"
          element={
            <Protected>
              <AddTodo />
            </Protected>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/update/:id"
          element={
            <Protected>
              <UpdateTodo />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}

export default App;
