import { useContext } from 'react';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

function App() {
  const {user}=useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ?<Home />:<Register/>} />
        <Route path='/login' element={user? <Navigate to="/"/>: <Login />} />
        <Route path='/register' element={user? <Navigate to="/"/>:<Register />} />
        <Route path='/profile/:username' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
