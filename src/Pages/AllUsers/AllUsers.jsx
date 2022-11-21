import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading/Loading';

const AllUsers = () => {
    const { isLoading, isError, data: users, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch(`http://localhost:4000/dashboard/all-users`)
            .then(res => res.json())
    });
    const makeAdminHandeler= (id) => {
        fetch(`http://localhost:4000/dashboard/users/admin/${ id }`, {
            method:"PUT",
            headers:{
                authorization:`bearer ${ localStorage.getItem('auth-token')}`
            }
        })
        .then(res => {
            if(res.status===403){
                toast.error("forbidden"); 
            }
            res.json()
        })
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                refetch();
            };
        })
    }
    if (isLoading) <Loading />;
    if (isError) <h3>An error has been occured!</h3>;
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Delete User</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user,i) => <tr key={ i }>
                            <th>{ i+1 }</th>
                            <td>{ user.name }</td>
                            <td>{ user.email }</td>
                            <td>{ user.role === 'admin'?"admin":<button onClick={() => makeAdminHandeler( user._id )} className='btn btn-primary text-white'>Make Admin</button>}</td>
                            <td><button className='btn btn-ghost hover:text-red-800'>Remove</button></td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;