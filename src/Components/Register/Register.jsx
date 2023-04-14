import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from '../firebase/firebase.config';

const Register = () => {

    const auth = getAuth(app);

    const [errors , setErrors] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit =(event)=>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setErrors("");
        setSuccess("");

        //validation:
        if(!/(?=.*[A-Z])/.test(password)){
            setErrors("Please Add Atleaset 1 Upper Case in password");
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setErrors("Please add Atleaset 2 letter in password")
            return;
        }
        else if(password.length < 6){
            setErrors("Please atleast 6 character in password")
            return;
        }

        createUserWithEmailAndPassword(auth,email,password)
        .then(response=>{
            const user = response.user;
            setSuccess("User SuccessFully Created");
            event.target.reset();
        })
        .catch(error=>{
            console.error(error);
            setErrors(error.message);
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Register</h2>

            <form onSubmit={handleSubmit}>
                <input className='w-100 mb-4 p-2 rounded' type="email" name="email" id="email" placeholder='your e-mail' required/>
                <br />
                <input className='w-100 mb-4 p-2 rounded' type="password" name="password" id="password" placeholder='your password' required/>
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>

            <p className='text-danger'>{errors}</p>
            <p className='text-success'>{success}</p>

        </div>
    );
};

export default Register;