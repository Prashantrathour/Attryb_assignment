import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/AuthReducer.jsx/action';
import { getInvetory } from '../redux/getInvetory/action';
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
`;

const NavTitle = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }
`;

const Navbar = () => {
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector((state) => state.authReducer);
console.log(isLoggedIn)
    const handleLogout = () => {
      // Your logout logic here
      // Remove the userid and token from local storage
      localStorage.removeItem('userid');
      localStorage.removeItem('token');
  
      // Dispatch the logout action
      dispatch(logout());
      dispatch(getInvetory(""))
    };
  


  return (
    <NavContainer>
      <NavTitle>BuyCars.com</NavTitle>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        {isLoggedIn ? (
          <button onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;
