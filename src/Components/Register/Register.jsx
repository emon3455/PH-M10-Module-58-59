import React from 'react';

const Register = () => {

    const handleSubmit =(event)=>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Register</h2>

            <form onSubmit={handleSubmit}>
                <input className='w-100 mb-4 p-2 rounded' type="email" name="email" id="email" placeholder='your E-mail'/>
                <br />
                <input className='w-100 mb-4 p-2 rounded' type="password" name="password" id="password" placeholder='your password'/>
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;