import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store';

const MyProfile = () => {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(null);
    const [passwordFormData, setPasswordFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const userId = useSelector((state) => state.auth.userId);
    const userToken = useSelector((state) => state.auth.userToken);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setUserInfo(response.data.data.user);
            } catch (error) {
                alert("Error fetching user information")
                console.error('Error fetching user information:', error);
            }
        };
        fetchUserInfo();
    }, [userId, userToken]);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/api/updatePassword`, {
                passwordCurrent: passwordFormData.currentPassword,
                password: passwordFormData.newPassword,
                passwordConfirm: passwordFormData.confirmNewPassword
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            console.log(response);
            alert("password changed");
        } catch (error) {
            alert("error changing password");
            console.error('Error changing password:', error);
        }
    };

    const handleChange = (e) => {
        setPasswordFormData({
            ...passwordFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogout = () => {
        dispatch(authActions.logout());
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            {userInfo ? (
                <div>
                    <h2 style={{ fontSize: "2rem", color: "#4CAF50", marginBottom: '20px' }}>My Profile</h2>
                    <div style={{ marginBottom: '20px', padding: "20px", border: "1px solid #ccc", borderRadius: '5px' }}>
                        <p>Name: {userInfo.name}</p>
                        <p>Email: {userInfo.email}</p>
                    </div>
                    <div style={{ marginBottom: '20px', padding: "20px", border: "1px solid #ccc", borderRadius: '5px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Change Password</h3>
                        <form onSubmit={handlePasswordChange}>
                            <div style={{ marginBottom: '10px' }}>
                                <label>Current Password:</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordFormData.currentPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label>New Password:</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordFormData.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label>Confirm New Password:</label>
                                <input
                                    type="password"
                                    name="confirmNewPassword"
                                    value={passwordFormData.confirmNewPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>Change Password</button>
                        </form>
                    </div>
                    <button onClick={handleLogout} style={{
                        position: 'fixed', bottom: '20px', right: '20px', padding: '10px 20px', borderRadius: '5px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer'
                    }}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MyProfile;