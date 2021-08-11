import React from 'react'
import { useRef } from 'react'


import classes from './RegisterForm.module.css';

const RegisterForm = ({ addUser }) => {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const registerUser = (e) => {
        console.log("Pressed")
        e.preventDefault();
        const enteredUsername = usernameInputRef.current.value.toString()
        const enteredPassword = passwordInputRef.current.value.toString()
        const entered = {
            'username': enteredUsername,
            'password': enteredPassword
        }
        const user = JSON.stringify(entered)
        addUser(user);

    }
    return (
        <div className={classes.body}>
            <div className={classes.container}>
                <div className={classes.column}>
                    <h1>Nephthalim's</h1>
                    <h2>Chat</h2>
                    <p className={classes.description}>This is a messaging application built
                        with Flask</p>
                    <div className={classes.login}>
                        <form onSubmit={registerUser}>
                            <input ref={usernameInputRef} type="username" id="username" name="username" placeholder="Username" />
                            <input ref={passwordInputRef} type="password" id="password" name="password" placeholder="Password" />
                            <input onClick={registerUser} type="submit" id="register-btn" name="register" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm
