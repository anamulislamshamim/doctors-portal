import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
const SignUp = () => {
    const { createNewUserWithEmailAndPassword, updateUserProfile } = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();

    if (token) {
        navigate("/");
    }
    const handleRegister = (data) => {
        createNewUserWithEmailAndPassword(data.email, data.password)
            .then(result => {
                if (result) {
                    console.log(result);
                    updateUserProfile(data.fullname)
                        .then(() => {
                            saveUser(result.user.displayName, result.user.email);
                        })
                }
            })
            .catch(() => {
                toast.error("Something went wrong!")
            })
    };
    const saveUser = (name, email) => {
        const user = { name, email };
        fetch(`http://localhost:4000/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
                toast.success("User created successfully!");
            });
    };
    return (
        <div className='min-h-[55vh] flex justify-center items-center'>
            <div className='p-4 border-2 rounded border-gray-100 shadow-md w-2/5'>
                <h2 className='text-center text-3xl'>Please Signup</h2>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Full Name</span>
                        </label>
                        <input type="text" {...register("fullname", {
                            required: "Full name is required!",
                        })} className="input input-bordered w-full" placeholder="Full name" />
                        {errors.fullname && <p className='text-red-700'>{errors.fullname?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", {
                            required: "Email is required!"
                        })} className="input input-bordered w-full" placeholder="Email" />
                        {errors.email && <p className='text-red-700'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required!",
                            minLength: { value: 6, message: "Password should at least 6 characters!" },
                            pattern: { value: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?](?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]/, message: "Please use a strong password!" },
                        })} className="input input-bordered w-full" placeholder="password" />
                        {errors.password && <p className='text-red-700'>{errors.password?.message}</p>}
                    </div>
                    <input type="submit" value="Sign up" className='w-full bg-primary text-white btn font-semibold my-5' />
                </form>
                <p className='text-center'>Already have account? <Link to="/login" className='link text-secondary'>Please Login</Link></p>
                <div className="flex flex-col w-full border-opacity-50">
                    <div className="divider">OR</div>
                </div>
                <button className='w-full btn-outline btn btn-ghost font-semibold my-5'>Continue with google</button>
            </div>
        </div>
    );
};

export default SignUp;