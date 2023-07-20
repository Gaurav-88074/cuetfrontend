import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { authActions } from '../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
const RotateToken = () => {
    const auth = localStorage.getItem("refresh") != null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        let interval = setInterval(async () => {
            if (auth) {
                updateToken();
            }
        }, 2000);
        return () => clearInterval(interval)
    }, [10])

    async function updateToken() {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
            body: JSON.stringify(
                {
                    refresh: localStorage.getItem("refresh")
                }
            )
        };

        // const resp = await fetch('http://127.0.0.1:8000/token/refresh/', options);
        const resp = await fetch('http://127.0.0.1:8000/token/refresh/', options);
        if (resp.status == 200) {
            const response = await resp.json();
            localStorage.setItem("refresh", response.refresh);
            // console.log(response);
            dispatch(authActions.setAccessToken(response.access));
            const decoded = jwt_decode(response.access);
            dispatch(authActions.setEmail(decoded.user));
            dispatch(authActions.setUsername(decoded.user));
        }
        else {
            navigate("/login");
        }
    }
}

export { RotateToken }