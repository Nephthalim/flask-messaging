import React from 'react'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import { toaster } from '../App.js'
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ setAuthentication }) => {
    
    const url = "https://nephthalims-chat.herokuapp.com"

    const addUser = (user) => {
        fetch(
            url + "/auth/register", {
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                    'Allow-Type': 'application/json',
                },
                mode: 'no-cors',

            }

        ).then((res) => {
            switch (res.status) {
                case 201:
                    return res.json();
                case 422:
                    toaster.error("Missing data");
                    break; //flash missing data;
                case 401:
                    toaster.error("User already exists")
                    break; //flash wrong credentials;
                default:
                    toaster.error("There seems to be an internal error 😬 It's not me, I promise. Please try again some other time! ") //flash error
                    break;
            }
        }).then((data) => {
            if (data.access_token) {
                localStorage.setItem("x-token", data.access_token)

                //Must implement this useState in the parent component
                setAuthentication(true);
            }
        }).catch((err) => {
            console.log(err)
        })

    }
    return <RegisterForm addUser = { addUser }
    />


}

export default Register