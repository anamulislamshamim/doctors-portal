import React from 'react';
import Banner from './Banner/Banner';
import InfoCards from './Info/InfoCards';
import bannerImg from "../../assets/images/bg.png";
import ServiceCards from './Services/ServiceCards';
import DentalCare from './DentalCare/DentalCare';
import Appoinment from './Appoinment/Appoinment';
import Testimonial from './Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='mx-5' style={{ backgroundImage: `url(${bannerImg})` }}>
            <Banner />
            <InfoCards />
            <ServiceCards />
            <DentalCare />
            <Appoinment />
            <Testimonial />
        </div>
    );
};

export default Home;