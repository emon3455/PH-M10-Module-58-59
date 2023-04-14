import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <>
            <Header></Header>
            <main className='container'>
            <Outlet></Outlet>
            </main>
        </>
    );
};

export default Main;