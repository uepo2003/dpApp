import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import SignUp from "./SignUp";
import Login from "./Login";
import UpLoad from "./UpLoad"
import MyPage from "./Mypage";
import Cookie from "./Cookie";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/Cookie" element={<Cookie />} />
        <Route path="/UpLoad" element={<UpLoad />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
