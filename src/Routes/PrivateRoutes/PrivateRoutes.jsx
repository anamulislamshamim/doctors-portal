import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log("location: ", location);
    if(loading){
        return <progress className="progress w-56"></progress>;
    };
    if(user){
        return children;
    };
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;