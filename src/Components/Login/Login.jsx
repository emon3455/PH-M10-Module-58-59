import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { app } from '../firebase/firebase.config';


const auth = getAuth(app);


const Login = () => {

    const [errors , setErrors] = useState("");
    const [success, setSuccess] = useState("");
    const emailRef =  useRef();

    const handleSubmit =(event)=>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        setErrors("");
        setSuccess("");

        //validation:
        if(!/(?=.*[A-Z])/.test(password)){
            setErrors("Your Password Atleaset have 1 Upper Case");
            return;
        }
        else if (!/(?=.*[0-9])/.test(password)){
            setErrors("Your password atleaset have 1 digit");
            return
        }
        else if(!/(?=.*[!@#\$%\^&\*_])/.test(password)){
            setErrors("your password atleast have 1 special character");
            return;
        }
        else if(password.length < 6){
            setErrors("your password have atleast 6 character");
            return;
        }

        
        

        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const logUser = result.user;
            console.log(logUser);
            setSuccess("login In Successfully Done !!");
            setErrors("");
            event.target.reset();
        })
        .catch(error=>{
            setErrors(error.message)
            setSuccess("");
        })
    }


    const handleForgetPassword=()=>{

        const email = emailRef.current.value;
        if(!email){
            alert("please add an email address");
            return;
        }
        console.log(email);
        sendPasswordResetEmail(auth, email)
        .then(res=>{
            alert("please check your email")
        })
        .catch(error=>{
            setErrors(error.message)
        })

    }
    

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Login</h2>

            <form onSubmit={handleSubmit}>
                <input className='w-100 mb-4 p-2 rounded' ref={emailRef} type="email" name="email" id="email" placeholder='your e-mail' required/>
                <br />
                <input className='w-100 mb-4 p-2 rounded' type="password" name="password" id="password" placeholder='your password' required/>
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>

            <p><small>Forgot Password ?</small> for Reset <button onClick={handleForgetPassword} className='btn btn-link'>Click Here</button></p>

            <p>Don't Have any account ? <Link to="/register">Go To Register</Link> </p>

            <p className='text-danger'>{errors}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;