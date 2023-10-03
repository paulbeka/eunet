import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Base from './pages/Base.js'
import Home from './pages/Home.js'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<Home />} />
          <Route path="*" element={<></>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
