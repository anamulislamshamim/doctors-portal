import { format } from 'date-fns';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const AppoinmentModal = ({ option, selected, appoinmentHandeler }) => {
    const { user } = useContext(AuthContext);
    const date = format(selected, 'PP');
    const { name, slots } = option;
    return (
        <>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={appoinmentHandeler} className='mt-10 grid grid-cols-1 gap-3'>
                        <input type="text" name='name' value={name} className="input input-bordered w-full" disabled />
                        <input type="text" name='date' value={date} placeholder='type' className="input input-bordered w-full" disabled />
                        <select name="time" placeholder='choose your time' className="select select-bordered w-full" required>
                            {
                                slots && slots.map((slot, index) => <option key={index}>{slot}</option>)
                            }
                        </select>
                        <input type="text" name='patient' defaultValue={user.displayName} className="input input-bordered w-full" disabled readOnly />
                        <input type="email" name='email' defaultValue={user.email} className="input input-bordered w-full" disabled readOnly />
                        <input type="phone" name='phone' placeholder='phone' className="input input-bordered w-full" />
                        <input type="submit" value="Submit" className="input input-bordered w-full text-white bg-accent cursor-pointer" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default AppoinmentModal;