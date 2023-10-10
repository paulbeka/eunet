import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Base from './pages/Base.js'
import Home from './pages/Home.js'
import About from './pages/About.js'
import Post from './pages/Post.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import { AuthProvider } from './util/AuthContext';
import LoginProtectedRoute from './components/protectedroutes/LoginProtectedRoute';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Base />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/post/:titleId" element={<Post />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/private" element={<LoginProtectedRoute element={<>Hello</>} />} />
            <Route path="*" element={<></>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
