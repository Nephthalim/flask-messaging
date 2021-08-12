import React from 'react'
import LoginForm from '../components/LoginForm/LoginForm';
import Nav from '../components/Nav/Nav';
import { toaster } from '../App.js'

const Login = ({ setAuthentication }) => {

    const loginUser = (user, setErrorMessage) => {
        fetch(
            "/auth/login",
            {
                method: 'POST',
                body: user,
                headers: {
                    'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json',
                },
                mode: 'cors'
            }

        ).then((res) => {
            switch (res.status) {
                case 201: return res.json();
                case 422:
                    toaster.error("Missing data")
                    break;//flash missing data;
                case 401:
                    toaster.error("Please check if you are using the right username or password")
                    break; //flash wrong credentials;
                default:
                    toaster.error("There seems to be an internal error 😬 It's not me, I promise. Please try again some other time! ") //flash error
                    break;

            }
        }).then((data) => {
            if (data.access_token) {
                console.log("Logged in")
                localStorage.setItem("x-token", data.access_token)
                toaster.success()
                //Must implement this useState in the parent component
                setAuthentication(true);
            } else {
                setErrorMessage(data.msg)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        // <div>
        <div>
            <Nav />
            <LoginForm loginUser={loginUser} />
        </div>

    )
}

export default Login
