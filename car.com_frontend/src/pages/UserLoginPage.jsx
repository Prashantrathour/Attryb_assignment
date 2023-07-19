import React, { useState } from 'react';
import axios from 'axios';
import { errorAlert, succesAlert } from '../components/Notifications';
import { ToastContainer } from 'react-toastify';
import styles from './LoginUserStyle.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
// import  Cookies from "js-cookies";
const Login = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(process.env.REACT_APP_BASEURL + "/users/Login", formData);
      console.log(response)
    localStorage.setItem("token",response.data.token)
      setLoading(false);
      succesAlert(response.data.msg);
      navigate("/")
    } catch (error) {
      setLoading(false);
      errorAlert(error.response.data.msg);
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        
          <div className={styles.form_group}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
         <div style={{padding:"10px"}}><NavLink to={"/register"}><strong>New user ?</strong></NavLink></div>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
        <ToastContainer />
    </div>
  );
};

export default Login;
