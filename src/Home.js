import React, { useState } from 'react';
import classes from './Home.module.css';
import { useNavigate } from 'react-router-dom';
function MyComponent() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleSubmit = () => {
        // Handle submit logic here
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        };
        // fetch('http://127.0.0.1:8000/batch', options)
        fetch('https://nimcetrankbackend-production.up.railway.app/nimcetscore', options)
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                console.log(data);

            })
    };
    const navigate = useNavigate();
    const loginHandler = () => {
        navigate("/login");
    }
    const signupHandler = () => {
        navigate("/signup");
    }
    return (
        <div className={classes.homePage}>
            <header className={classes.homePageHeader}>
                <nav className={classes.hphs1}>

                </nav>
                <nav className={classes.hphs2}>
                    {/* <div className={classes.navItems}>
            Home
          </div> */}
                </nav>
                <nav className={classes.hphs3}>
                    <button
                        className={classes.hphAuthSection}
                        onClick={loginHandler}
                    >
                        login
                    </button>
                    <button
                        className={classes.hphAuthSection}
                        onClick={signupHandler}
                    >
                        sign-up
                    </button>
                </nav>
            </header>
        </div>
    );
}

export default MyComponent;
