import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-toastify";
import { useState } from "react";
import useToken from "../../hooks/useToken";
const Login = () => {
    const { logInWithEmailAndPassword } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const token = useToken(currentUserEmail);
    const from = location.state?.from?.pathname || "/";
    if (token) {
        navigate(from, { replace: true });
    };
    console.log("login location: ", location);
    console.log("from: ", from);
    const loginHandeler = (data) => {
        logInWithEmailAndPassword(data.email, data.password)
            .then((result) => {
                setCurrentUserEmail(result.user.email);
                setLoginError('');
                toast.success("Successful!");
            })
            .catch((error) => setLoginError(error.message.split(":")[1]));
    };
    return (
        <div className='min-h-[55vh] flex justify-center items-center'>
            <div className='p-4 border-2 rounded border-gray-100 shadow-md w-2/5'>
                <h2 className='text-center text-3xl'>Please Login</h2>
                <form onSubmit={handleSubmit(loginHandeler)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" className="input input-bordered w-full" {...register("email", { required: true })} placeholder="Email" />
                        {errors.email?.type === 'required' && <p className="text-red-700">Email is required!</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full" {...register("password", { required: true })} placeholder="password" />
                        {errors.password?.type === "required" && <p className="text-red-700">Password is required!</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text link hover:text-secondary">Forgotten Password?</span>
                        </label>
                    </div>
                    {loginError &&
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="text-red-700 font-semibold">{loginError}</span>
                            </label>
                        </div>
                    }
                    <button className='w-full bg-primary text-white btn font-semibold my-5'>Login</button>
                </form>
                <p className='text-center'>New to Doctors Portal? <Link to="/register" className='link text-secondary'>Create new account</Link></p>
                <div className="flex flex-col w-full border-opacity-50">
                    <div className="divider">OR</div>
                </div>
                <button className='w-full btn-outline btn btn-ghost font-semibold my-5'>Continue with google</button>
            </div>
        </div>
    );
};

export default Login;