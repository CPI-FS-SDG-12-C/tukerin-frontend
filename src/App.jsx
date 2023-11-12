import CompleteUserData from "./pages/CompleteUserData/CompleteUserData";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import HomePage from "./pages/homepage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/completeDataUser" element={<CompleteUserData />} />
      </Routes>
    </Router>
  );
}

export default App;
