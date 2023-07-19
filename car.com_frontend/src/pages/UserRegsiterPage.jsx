import React, { useState } from 'react';
import axios from 'axios';
import { errorAlert, succesAlert } from '../components/Notifications';
import { ToastContainer } from 'react-toastify';
import styles from './registerUserStyle.module.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      const response = await axios.post(process.env.REACT_APP_BASEURL + "/users/register", formData);
      setLoading(false);
      succesAlert("User Registered Please Login");
      navigate("/login")
    } catch (error) {
      setLoading(false);
      errorAlert(error.response.data.msg);
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
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
          <div style={{padding:"10px"}}><NavLink to={"/login"}><strong>Already registered ?</strong></NavLink></div>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
        <ToastContainer />
    </div>
  );
};

export default Register;
