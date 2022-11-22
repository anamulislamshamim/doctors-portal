import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../Shared/Loading/Loading';

const MyAppoinment = () => {
    const { user } = useContext(AuthContext);
    const { data: bookings, isLoading, isError } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: () => fetch(`http://localhost:4000/bookings?email=${user.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem("auth-token")}`
            }
        }).then(res => res.json())
    });
    console.log(bookings);
    if (isLoading) {
        return <Loading />
    };
    if (isError) {
        return <p>An error has been occured!</p>
    };

    return (
        <div>
            <h2 className='text-2xl font-semibold mb-5'>My Appoinments</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookings.length > 0 && bookings.map((book, index) => <tr key={index}>
                                <th>{index + 1} </th>
                                <td>{book.patient}</td>
                                <td>{book.treatment}</td>
                                <td>{book.appoinmentDate}</td>
                                <td>{book.slot}</td>
                                <td>
                                    {
                                        book.price && !book.paid && <Link to={`/dashboard/payment/${ book._id }`}><button className='btn btn-warning text-white font-semibold'>Pay</button></Link>
                                    }
                                    {
                                        book.price && book.paid && <span className='btn btn-primary'>Paid</span>
                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppoinment;