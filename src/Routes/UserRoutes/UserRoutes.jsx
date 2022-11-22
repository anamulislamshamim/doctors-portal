import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layouts/DashboardLayout/DashboardLayout";
import Main from "../../Layouts/Main/Main";
import AddDoctor from "../../Pages/AddDoctor/AddDoctor";
import AllUsers from "../../Pages/AllUsers/AllUsers";
import MyAppoinment from "../../Pages/Dashboard/MyAppoinment";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import MakeAppoinment from "../../Pages/MakeAppoinment/MakeAppoinment";
import ManageDoctors from "../../Pages/ManageDoctors/ManageDoctors";
import Payment from "../../Pages/Payment/Payment";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoutes from "../AdminRoutes/AdminRoutes";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Main />,
        errorElement:<p>This page is not available!</p>,
        children: [
            {
                path:"/",
                element:<Home />
            },
            {
                path:"/login",
                element:<Login />
            },
            {
                path:"/appoinment",
                element:<PrivateRoutes><MakeAppoinment /></PrivateRoutes>
            },
            {
                path:"/register",
                element:<SignUp />
            }
        ]
    },
    {
        path:"/dashboard",
        element:<PrivateRoutes><DashboardLayout /></PrivateRoutes>,
        children:[
            {
                path:"/dashboard",
                element:<MyAppoinment />
            },
            {
                path:"/dashboard/all-users",
                element:<AdminRoutes><AllUsers /></AdminRoutes>
            },
            {
                path:"/dashboard/add-doctor",
                element:<AdminRoutes><AddDoctor /></AdminRoutes>
            },
            {
                path:"/dashboard/manage-doctors",
                element:<ManageDoctors />
            },
            {
                path:"/dashboard/payment/:id",
                loader: ({ params }) => fetch(`http://localhost:4000/bookings/${ params.id }`),
                element:<Payment />
            }
        ]
    }
]);

export default router;