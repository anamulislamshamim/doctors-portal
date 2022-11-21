import React from 'react';
import quote from "../../../assets/icons/quote.svg";
import people1 from "../../../assets/images/people1.png"
import people2 from "../../../assets/images/people2.png"
import people3 from "../../../assets/images/people3.png"
import TestimonialCard from './TestimonialCard';
const Testimonial = () => {
    const testimonialData = [
        {
            id:1,
            name:"David Wilson",
            city:"California",
            image:people1,
            message:"It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content"
        },
        {
            id:2,
            name:"David Wilson",
            city:"California",
            image:people2,
            message:"It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content"
        },
        {
            id:3,
            name:"David Wilson",
            city:"California",
            image:people3,
            message:"It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content"
        }
    ];
    return (
        <div className='mt-32'>
            <div className='lg:flex justify-between'>
                <div className='w-3/5'>
                    <h1 className='text-primary font-bold text-3xl'>Testimonial</h1>
                    <p className='text-4xl mt-2'>What Our Patients Says</p>
                </div>
                <div className='flex justify-end items-start'>
                    <img className='w-2/5' src={quote} alt="" />
                </div>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-20'>
                {
                    testimonialData.map(testimonial => <TestimonialCard
                        key={testimonial.id}
                        testimonial={testimonial}
                        />)
                }
            </div>
        </div>
    );
};

export default Testimonial;