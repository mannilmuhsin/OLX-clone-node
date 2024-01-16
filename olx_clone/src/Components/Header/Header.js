import React, { useContext } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { useNavigate } from "react-router";
import { authContext } from "../../store/Context";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Header() {
  const { user, setRefresh, refresh } = useContext(authContext);
  const Navigate = useNavigate();

  const searchHandler = (e) => {
    console.log(e.target.value);
  };

  function logoutHandler() {
    const ConfirmationDialog = () => (
      <div>
        <p color="red">Are you sure you want to logout?</p>
        <button onClick={handleLogout}>Yes</button>
        <button onClick={() => toast.dismiss()}>No</button>
      </div>
    );

    const handleLogout = async () => {
      axios.get("/userLogout").then((response) => {
        setRefresh(!refresh);
        toast.dismiss();
      });
    };

    toast(<ConfirmationDialog />, {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              onChange={searchHandler}
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user.login ? (
            <Dropdown>
              <Dropdown.Toggle>{user.details.name}</Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span
              onClick={() => {
                {
                  user ? Navigate("/sell") : Navigate("/login");
                }
              }}
            >
              SELL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
