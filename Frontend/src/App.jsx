import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from "./context/AuthProvider";
import Contacts from "./contact/Contacts";

function App() {

  const [authUser] = useAuth()

  const ProtectedRoute = ({ children }) => {
    if (!authUser) {
      setTimeout(() => {
        toast.error("Wait --- To access this course page, You have to Login first !");
      }, 1000);
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <>
      <div className="dark:bg-slate-800 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<ProtectedRoute>  <Courses /> </ProtectedRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contacts />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;