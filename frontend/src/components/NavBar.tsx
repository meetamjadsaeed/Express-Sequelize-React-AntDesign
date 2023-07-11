import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../assets/css/navbar.css";

import AppService from "../services/appServices";

import { ToastContainer, toast } from "react-toastify";

import { Input } from "antd";

const { Search } = Input;

const NavBar = () => {
  const navigate = useNavigate();

  // Retrieving the user token from local storage
  var userToken = localStorage.getItem("userToken");

  const logoutUser = () => {
    try {
      localStorage.removeItem("userToken");
      toast.success("User logged out");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <>
      <div className="navbar">
        <a className="active" href="/">
          Home
        </a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="/">Products</a>
        <a href="/register">{userToken ? "" : "Register"}</a>
        <a href="/login">{userToken ? "" : "Login"}</a>

        <a onClick={logoutUser}>{userToken ? "LogOut" : ""}</a>
        <a href="/addProduct">
          {userToken ? "Add Product" : "Login to Add Product"}
        </a>
      </div>
    </>
  );
};

export default NavBar;
