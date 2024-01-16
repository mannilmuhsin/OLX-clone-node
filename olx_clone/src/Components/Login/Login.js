import React, { useContext, useEffect, useState } from "react";

import Logo from "../../olx-logo.png";
import "./Login.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { authContext } from "../../store/Context";

function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { refresh, setRefresh, user } = useContext(authContext);
  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("/userLogin", { email, password }).then((response) => {
      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message + " " + response.data.name);
        setRefresh(!refresh);
        Navigate("/");
      }
    });
  };
  useEffect(() => {
    console.log(user);
    if (user.loggedIn) {
      Navigate("/");
    }else{
      Navigate('/login')
    }
  },[]);
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={submitHandler}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <p onClick={() => Navigate("/signUp")}>Signup</p>
      </div>
    </div>
  );
}

export default Login;
