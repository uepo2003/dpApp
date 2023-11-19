import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import SignUp from "./SignUp";
import Login from "./Login";
import UpLoad from "./UpLoad";
import Other from "./Other";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Other" element={<Other />} />
        <Route path="/UpLoad" element={<UpLoad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
