import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Navbar from '../../Pages/Shared/Navbar.jsx/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    console.log("isAdmin: ", isAdmin);
    return (
        <>
            <Navbar />
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80">
                        <li><Link to='/dashboard'>My Dashboard</Link></li>
                        {
                            isAdmin && <>
                            <li><a href='/dashboard/all-users'>All Users</a></li>
                            <li><a href='/dashboard/add-doctor'>Add Doctor</a></li>
                            <li><a href='/dashboard/manage-doctors'>Manage Doctor</a></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </>
    );
};

export default DashboardLayout;