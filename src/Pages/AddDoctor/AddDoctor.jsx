import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const imagebbKey = process.env.REACT_APP_imagebb_key;
    const { data:specialities, isloading, isError } = useQuery({
        queryKey:['speciality'],
        queryFn: () => fetch(`http://localhost:4000/appoinmentSpeciality`)
        .then(res => res.json())
    });
    const handleAddDoctor = (data) => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image",image);
        fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${ imagebbKey}`,{
            method:"POST",
            body:formData
        }).then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                const doctor = {
                    name:data.fullname,
                    email:data.email,
                    speciality:data.speciality,
                    image:imgData.data.url
                };
                fetch("http://localhost:4000/addDoctor", {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        authorization:`bearer ${ localStorage.getItem("auth-token")}`
                },
                    body:JSON.stringify(doctor)
                }).then(res => res.json())
                .then(result => {
                    if(result.acknowledged){
                        navigate("/dashboard/manage-doctors")
                        toast.success("Doctor added successfully!");
                    };
                }).catch((err) => {
                    if(err){
                        toast.error("Something went wrong! Try again!");
                    }
                })
            }
        });
    };
    if(isloading){
        return <Loading />
    };
    if(isError){
        return <h3>An Error has been Occured!</h3>
    };
    return (
        <div className='w-3/5'>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
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
                <div className="form-control w-full mt-3">
                    <select {...register("speciality")} className="select select-bordered w-full">
                        {
                            specialities?.map(speciality =><option 
                                key={ speciality._id }
                                value={ speciality.name }
                                >{ speciality.name }
                                </option>
                            )
                        }
                    </select>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Upload image</span>
                    </label>
                    <input type="file" {...register("image", {
                        required: "image is required!"
                    })} className="input input-ghost px-0 w-full" placeholder="Email" />
                    {errors.img && <p className='text-red-700'>{errors.img?.message}</p>}
                </div>
                <input type="submit" value="Add Doctor" className='w-full bg-primary text-white btn font-semibold my-5' />
            </form>
        </div>
    );
};

export default AddDoctor;