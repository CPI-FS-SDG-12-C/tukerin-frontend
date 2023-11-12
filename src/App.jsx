import CompleteUserData from "./pages/CompleteUserData/CompleteUserData";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/notFound";
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
