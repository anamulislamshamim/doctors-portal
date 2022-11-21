import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../../Pages/Shared/Loading/Loading';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdmin(user?.email);
    const location = useLocation();
    console.log("location: ", location);
    if(loading || adminLoading){
        return <Loading />;
    };
    if(user && isAdmin){
        return children;
    };
    return <>
    <Navigate to="/login" state={{ from: location }} replace />
    </>;
};

export default AdminRoutes;