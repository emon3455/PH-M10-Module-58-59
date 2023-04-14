import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Register = () => {

    const auth = getAuth(app);

    const [errors , setErrors] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit =(event)=>{
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        setErrors("");
        setSuccess("");

        //validation:
        if(!/(?=.*[A-Z])/.test(password)){
            setErrors("Please Add Atleaset 1 Upper Case in password");
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)){
            setErrors("Please add atleaset 1 digit");
            return
        }
        else if(!/(?=.*[!@#\$%\^&\*_])/.test(password)){
            setErrors("Please add atleast 1 special character");
            return;
        }
        else if(password.length < 6){
            setErrors("Please atleast 6 character in password")
            return;
        }
        

        createUserWithEmailAndPassword(auth,email,password)
        .then(response=>{
            const user = response.user;
            verifyEmail(user);
            setSuccess("User SuccessFully Created");
            event.target.reset();
            setErrors("")
            setUserName(user,name);
        })
        .catch(error=>{
            console.error(error);
            setErrors(error.message);
        })
    }

    const verifyEmail=(user)=>{
        sendEmailVerification(user)
        .then(res=>{
            const ans = confirm("Please verify you email address");
            if(!ans){
                return;
            }
        })
        .catch(error=>{
            setErrors(error.message.value);
        })
    }

    const setUserName=(user,name)=>{

        updateProfile(user,{ displayName: name} )
        .then(res=>{
            alert(`your Display /name is: ${name}`)
        })
        .catch(error=>{
            setErrors(error.message);
        })

    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Register</h2>

            <form onSubmit={handleSubmit}>
                <input className='w-100 mb-4 p-2 rounded' type="text" name="name" id="name" placeholder='your Name' required/>
                <input className='w-100 mb-4 p-2 rounded' type="email" name="email" id="email" placeholder='your e-mail' required/>
                <br />
                <input className='w-100 mb-4 p-2 rounded' type="password" name="password" id="password" placeholder='your password' required/>
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p>Alredy Have an account ? <Link to="/login">Go To Log-in</Link> </p>

            <p className='text-danger'>{errors}</p>
            <p className='text-success'>{success}</p>

        </div>
    );
};

export default Register;