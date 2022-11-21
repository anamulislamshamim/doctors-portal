import React from 'react';

const TestimonialCard = ({ testimonial }) => {
    const { name,city,image,message } = testimonial;
    return (
        <div className="card w-full bg-white text-primary-content shadow-md">
            <div className="card-body">
                <p className='font-semibold'>{ message }</p>
                <div className="flex">
                    <div>
                        <img src={image} className="border-2 border-primary" alt="" style={{width:"3rem",height:"3rem",borderRadius:"50%"}}/>
                    </div>
                    <div className='ml-3 items-center'>
                        <h3>{ name }</h3>
                        <p>{ city }</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;