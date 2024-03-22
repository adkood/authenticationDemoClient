import React, { useEffect } from 'react';
import axios from 'axios';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import MyProfile from './components/profile/MyProfile';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './store';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshAuthToken = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/refresh',
          {},  
          {
              withCredentials: true,
              headers: {
                  "Content-Type": "application/json"
              }
          }
      );
        dispatch(authActions.setToken(response.data.token)); 
        dispatch(authActions.login()); 
        dispatch(authActions.setId(response.data.data.user._id));
      } catch (error) {
        if (error.response) {
          console.error('Error refreshing token:', error.response.data);
        } else {
          console.error('Error refreshing token:', error.message);
        }
      }
    };

    refreshAuthToken();
  }, []);


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
