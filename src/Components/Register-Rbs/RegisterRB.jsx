import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { app } from '../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const RegisterRB = () => {

    const [errors , setErrors] = useState("");
    const [success, setSuccess]= useState("");

    const handleSubmit =(event)=>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        setErrors("")
        setSuccess("")

        if(!/(?=.*[A-Z])/.test(password)){
            setErrors("Please add atleast 1 Uppercase");
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
        .then(result=>{

            const registerUser = result.user;
            setSuccess("User Created Successfully");
            setErrors("");
        })
        .catch(error=>{
            setErrors(error.message);
        })

    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accept Our Term and Condition" />
                </Form.Group>
                <Button name='' variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <p>Alredy Have an account ? <Link to="/login">Go To Log-in</Link> </p>

            <p className='text-danger'>{errors}</p>
            <p className='text-success'>{success}</p>

        </div>
    );
};

export default RegisterRB;