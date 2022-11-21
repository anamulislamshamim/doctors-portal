import React from 'react';
import fluoride from "../../../assets/images/fluoride.png";
import cavity from "../../../assets/images/cavity.png";
import whitening from "../../../assets/images/whitening.png";
import ServiceCard from './ServiceCard';
const ServiceCards = () => {
    const cardData = [
        {
            id: 1,
            title: "Fluoride Treatment",
            description: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            icon: fluoride
        },
        {
            id: 2,
            title: "Cavity Filling",
            description: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            icon: cavity
        },
        {
            id: 3,
            title: "Teeth Whitening",
            description: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
            icon: whitening
        },
    ]
    return (
        <>
            <div className='mt-20'>
                <h2 className='text-primary text-bold text-2xl text-center'>OUR SERVICES</h2>
                <h4 className='text-center mt-5 text-3xl'>Services We Provide</h4>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 mt-16 gap-4'>
                {
                    cardData.map(card => <ServiceCard
                        key={card.id}
                        card={card}
                    />)
                }
            </div>
        </>
    );
};

export default ServiceCards;