import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import SignUp from "./SignUp";
import Login from "./Login";
import UpLoad from "./Tweet";
import Other from "./Other";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Other" element={<Other />} />
        <Route path="/UpLoad" element={<UpLoad />} />
      </Routes>
    </Router>
  );
}

export default App;
