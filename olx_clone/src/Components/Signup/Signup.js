import React, { useState } from "react";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signup() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/userRegister", {
        name,
        mobile,
        password,
        email,
      })
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          Navigate('/login')
        }
      });
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={submitHandler}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            onChange={(e) => {
             
              setName(e.target.value);
            }}
            name="name"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="number"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            name="phone"
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
          <button>Signup</button>
        </form>
        <p onClick={() => Navigate("/login")}>Login</p>
      </div>
    </div>
  );
}
