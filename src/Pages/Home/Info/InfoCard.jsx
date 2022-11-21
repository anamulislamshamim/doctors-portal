import React from 'react';

const InfoCard = ({ card }) => {
    const { name, bg, description, icon } = card;
    return (
        <div className={`card lg:card-side ${bg} shadow-xl text-white font-semibold px-4 pt-5`}>
            <figure>
                <img src={ icon } alt="" />
            </figure>
            <div className="card-body flex-col items-center lg:items-start">
                <h2 className="lg:text-left card-title">{name}</h2>
                <p className='lg:text-left text-center'>{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;