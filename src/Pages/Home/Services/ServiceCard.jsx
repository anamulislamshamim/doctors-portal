import React from 'react';

const ServiceCard = ({ card }) => {
    const { title, description, icon } = card;
    return (
        <div className="card w-full shadow-xl bg-white pt-5">
            <figure><img src={ icon } alt="Shoes" /></figure>
            <div className="card-body justify-center flex-col items-center text-accent font-semibold">
                <h2 className="card-title">{ title }</h2>
                <p className='text-center'>{ description }</p>
            </div>
        </div>
    );
};

export default ServiceCard;