import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./features/Login/Login";
import Signup from "./features/Signup/Signup";
import AddBookForm from "./features/Book/AddBookForm";
import ErrorPage from "./features/Error/ErrorPage";
import Navigation from "./components/layout/Navigation/Navigation";
import Explore from "./features/Explore/Explore";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.login);

  console.log("App LoggedUser:", user);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route
          path="/addBook"
          element={
            user.role === "admin" || user.role === "author" ? (
              <AddBookForm />
            ) : (
              <Navigate to="/error" />
            )
          }
        />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
