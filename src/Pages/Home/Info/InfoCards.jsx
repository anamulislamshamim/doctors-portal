import React from 'react';
import clock from "../../../assets/icons/clock.svg";
import marker from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";
import InfoCard from './InfoCard';
const InfoCards = () => {
    const cardData = [
        {
            id:1,
            name:"Opening Hours",
            description:"Open 9.00am to 5.00pm everyday",
            icon:clock,
            bg:"bg-gradient-to-r from-primary to-secondary"
        },
        {
            id:2,
            name:"Opening Hours",
            description:"Open 9.00am to 5.00pm everyday",
            icon:marker,
            bg:"bg-gradient-to-r from-black to-accent"
        },
        {
            id:3,
            name:"Opening Hours",
            description:"Open 9.00am to 5.00pm everyday",
            icon:phone,
            bg:"bg-gradient-to-r from-primary to-secondary"
        },
    ]
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-20'>
            {
                cardData.map(card => <InfoCard
                    key={card.id}
                    card={card}
                    />)
            }
        </div>
    );
};

export default InfoCards;