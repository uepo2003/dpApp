import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import SignUp from './SignUp';
import Login from './Login';
import MyPage from './Mypage';
  function App () {
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignUp" element={<SignUp/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </BrowserRouter>
    );
  };
  
  export default App;