import React, { useEffect } from 'react';
import axios from 'axios';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import MyProfile from './components/profile/MyProfile';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="App" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {!isLoggedIn && (
        <div style={{ maxWidth: '400px', width: '100%', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Sign up</h2>
          <Signup />
          <h2 style={{ margin: '20px 0' }}>Or</h2>
          <h2>Login</h2>
          <Login />
        </div>
      )}
      {isLoggedIn && <MyProfile />}
    </div>
  );
}

export default App;
