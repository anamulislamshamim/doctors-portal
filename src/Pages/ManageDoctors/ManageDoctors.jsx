import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthProvider';
// import { toast } from 'react-toastify';
import ConfirmationModal from '../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [ deleteDoctor, setDeleteDoctor ] = useState(null);
    const { logOut } = useContext(AuthContext);
    const { data: doctors, isLoading, isError, refetch } = useQuery({
        queryKey: ["doctors"],
        queryFn: () => fetch(`http://localhost:4000/doctors`,{
            headers:{
                authorization: `bearer ${localStorage.getItem('auth-token')}`
            }
        }).then(res => {
            if(res.status === 403){
                logOut();
            };
            return res.json();
        })
    });
    const closeModal = () => {
        setDeleteDoctor(null);
    };
    const confirmDelete = ( doctor) => {
        fetch(`http://localhost:4000/dashboard/manage-doctors/delete/${ doctor._id }`, {
            method:"DELETE",
            headers:{
                authorization:`bearer ${ localStorage.getItem('auth_token') }`
            }
        }).then(res => res.json())
        .then(deleteData => {
            if(deleteData.acknowledged){
                refetch();
                toast.success("Deleted successful!");
            }
        }).catch(err => {
            toast.error("something went wrong!")
        })
    };

    if (isLoading) {
        return <Loading />
    };
    if (isError) {
        return <h2>An error has been occured!</h2>
    };
    return (
        <div className="overflow-x-auto w-full">
            <div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Doctor Info</th>
                            <th>Speciality</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.length === 0 ? <h2 className='text-red-700 text-3xl my-3'>No doctors added yet!</h2> : doctors.map((doctor, index) => <tr key={doctor._id}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={`${doctor.image}`} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{doctor.name}</div>
                                            <div className="text-sm opacity-50">Bangladesh</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {doctor.speciality}
                                </td>
                                <td>{doctor.email}</td>
                                <th>
                                    < label onClick={() => setDeleteDoctor(doctor)} htmlFor="confirmation-modal" className="btn text-red-900 btn-ghost btn-xs" > remove</label >
                                </th>
                            </tr>)
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
            {
                deleteDoctor && <ConfirmationModal
                    title={`Are you want to delete permanantly?`}
                    message={`If you delete then you will not recover it again!`}
                    closeModal={ closeModal }
                    confirmDelete={ confirmDelete }
                    willDelete={ deleteDoctor }
                />
            }
        </div>
    );
};

export default ManageDoctors;