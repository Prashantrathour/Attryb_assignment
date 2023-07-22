import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/AuthReducer.jsx/action";

import Cookies from "js-cookie";
import Avatar from "react-avatar";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  width: 100%;
  box-sizing: border-box;

  @media screen and (max-width: 408px) {
    flex-direction: column;
    align-items: flex-start;
  }
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

  @media screen and (max-width: 768px) {
    margin-top: 10px;
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

  @media screen and (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    navigate("/login");
  };

  return (
    <NavContainer>
      <NavTitle>BuyCars.com</NavTitle>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        {Cookies.get("isLoggedIn") ? (
          <Flex>
            <Button onClick={handleLogout}>Logout</Button>
            <Avatar name={Cookies.get("username") || "N A"} size="40" textSizeRatio={1.2} />
          </Flex>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:"500px";

  Button{
    margin-right: 5px;
  }
  @media screen and (max-width: 308px) {
    flex-direction: column;
    align-items: center;

    & > *:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

const Button = styled.button`
  background-color: transparent;
  color: white;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid white;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }

  @media screen and (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;
