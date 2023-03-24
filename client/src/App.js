import React, { useState, useEffect } from 'react';
import AuthContext from './Contexts/AuthContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
//import TestTer from './Components/testUI';

import Navbar from './Components/Navbar';
import Home from './Pages/Home';

import LogIn from './Pages/Auth/Login';
import SignUp from './Pages/Auth/Register';
import axios from 'axios';
//import BrowserCategory from './Pages/Category/BrowseCategory';
import CreateCategory from './Pages/Category/CreatCategory';
import BrowserCategory from './Pages/Category/BrowseCategory';
import ShowCategory from './Pages/Category/ShowCategory';

import ShowForum from './Pages/Forum/ShowForum';
//import BrowserFora from './Pages/Forum/BrowseFora';
import CreateForum from './Pages/Forum/CreatForum';

import ShowThread from './Pages/Thread/ShowThread';
//import BrowserThread from './Pages/Thread/BrowseThread';
import CreateThread from './Pages/Thread/CreatThread';
import './Pages/Home.css';

function App() {
  const [user, setUser] = useState(null);
  const [isInitiated, setIsInitiated] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/auth/init', { params: { token } });
    const { user } = response.data;
    //setUser(user);
    setIsInitiated(true);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem('token', null);
  };

  return (
    <div>
      {isInitiated && (
        <AuthContext.Provider value={{ user, setUser, handleLogout }}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/auth/login"
                element={!user ? <LogIn /> : <Navigate to="/" />}
              ></Route>
              <Route
                path="/auth/register"
                element={!user ? <SignUp /> : <Navigate to="/" />}
              ></Route>

              <Route
                path="/category/create"
                element={
                  user ? <CreateCategory /> : <Navigate to="/auth/login" />
                }
              ></Route>
              <Route path="/category/:id" element={<ShowCategory />}></Route>
              <Route path="/category/" element={<BrowserCategory />}></Route>

              <Route
                path="/forum/create/:id"
                element={user ? <CreateForum /> : <Navigate to="/auth/login" />}
              ></Route>
              <Route path="/forum/:id" element={<ShowForum />}></Route>

              <Route
                path="/thread/create/:id"
                element={
                  user ? <CreateThread /> : <Navigate to="/auth/login" />
                }
              ></Route>
              <Route path="/thread/:id" element={<ShowThread />}></Route>
            </Routes>
          </Router>
        </AuthContext.Provider>
      )}
    </div>
  );
}

export default App;
