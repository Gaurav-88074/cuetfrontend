import React from 'react'
import classes from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { authActions } from './redux/AuthSlice';
import jwt_decode from 'jwt-decode';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rytSignHandler = (event) => {
    navigate("/Signup");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInHandler = async () => {
    // return
    const body = {
      username: email,
      password: password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
    }
    // let response = await fetch('http://127.0.0.1:8000/login', options);
    let response = await fetch('http://127.0.0.1:8000/login', options);
    if (response.status == 200) {
      let data = await response.json();
      // console.log(data.refresh);
      localStorage.setItem("refresh",data.refresh);      

      const decoded = jwt_decode(data.access);

      dispatch(authActions.setEmail(decoded.user));
      dispatch(authActions.setUsername(decoded.user));

      navigate("/dashboard")
        console.log("login successfull");
    }
    else {
      alert("username or password is invalid");
    }
  }
  return (
    <div className={classes.signupDom}>
      <div className={classes.leftBody}></div>
      <div className={classes.sudSection2}>
        <div className={classes.sudSection_0}>
          <div className={classes.sudDection_0_1}>
            <span>Not a member?</span>
            <button className={classes.rytSign}
              onClick={rytSignHandler}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className={classes.sudSection_2}>
          <section className={classes.signupSection}>
            <div className={classes.nameInput}>


              <div className={classes.userNameSection}
                style={{ width: '100%' }}
              >
                <label className={classes.nameLabel}>
                  Email
                </label>
                <input type="email"
                  className={classes.nameTextInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className={classes.passwordInput}>
              <label className={classes.nameLabel}
              >
                Password
              </label>
              <input
                type="password"
                className={classes.nameTextInput}
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={classes.sudSection_3_1}>
              <button className={classes.createAcbutton}
                style={{
                  height: '20%'
                }}
                onClick={signInHandler}
              >
                Sign In
              </button>
            </div>

          </section>
        </div>

      </div>
    </div>
  )
}

export default Login