import React from 'react';

const AppoinmentCard = ({ appoinment, setOption }) => {
    const { name, slots, price } = appoinment;
    return (
        <div className="card shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl text-secondary">{name}</h2>
                <p className='font-bold'>{slots?.length > 0 ? slots[0] : "Seeking another day!"}</p>
                <p className='font-bold'>{slots?.length} {slots.length > 1 ? "spaces" : "space"}</p>
                <p>${ price }</p>
                <div className="card-actions">
                    <label onClick={() => setOption(appoinment)}
                        htmlFor="my-modal-3"
                        disabled={ slots?.length === 0}
                        className="btn btn-primary text-white">
                            book appoinment
                    </label>
                </div>
            </div>
        </div>
    );
};

export default AppoinmentCard;