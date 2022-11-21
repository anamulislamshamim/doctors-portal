import React from 'react';
import Navbar from '../../Pages/Shared/Navbar.jsx/Navbar';
import { Outlet } from "react-router-dom";
import Footer from '../../Pages/Shared/Footer/Footer';

const Main = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Main;