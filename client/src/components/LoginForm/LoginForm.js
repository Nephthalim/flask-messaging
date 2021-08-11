import React from 'react'
import image from './image.svg'
import { Link } from 'react-router-dom';
import classes from './LoginForm.module.css';
import { useRef } from 'react';
import { useState } from 'react'

const LoginForm = ({ loginUser }) => {
    const [errorMessage, setErrorMessage] = useState("")
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const loginUserHandler = (e) => {
        e.preventDefault();
        const enteredUsername = usernameInputRef.current.value
        const enteredPassword = passwordInputRef.current.value

        const entered = {
            "username": enteredUsername,
            "password": enteredPassword
        }
        const user = JSON.stringify(entered)
        loginUser(user, setErrorMessage);

    }

    return (

        <section className={classes.hero}>
            <div className={classes.container}>
                <h1>Nephthalim's</h1>
                <h2>Chat</h2>
                <form className={classes.login} id="login">
                    <input ref={usernameInputRef} type="username" id="username" name="username"
                        placeholder="Username" />
                    <input ref={passwordInputRef} type="password" id="password" name="password"
                        placeholder="Password" />
                    <div className={classes.buttons}>
                        <a href="#" className={classes.btn} onClick={loginUserHandler}>Login</a>
                        <a href="#" className={classes.btn}><Link to='/register' style={{ textDecoration: "none", color: "#ffff" }}>Register</Link></a>
                    </div>
                    <div>{errorMessage}</div>

                </form>
                <p className={classes.description}>This is a messaging application built
                    with Flask</p>
            </div>
            <div className={classes.image}>
                <img alt ="" src={image} />
            </div>
        </section>
    )
}

export default LoginForm
