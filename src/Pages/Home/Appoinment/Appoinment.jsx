import React from 'react';
import doctor from "../../../assets/images/doctor.png";
import appoinment from "../../../assets/images/appointment.png";
const Appoinment = () => {
    return (
        <section className='mt-32' style={{ backgroundImage: `url(${appoinment})` }}>
            <div className="hero mt-20">
                <div>
                    <div className="hero-content flex-col lg:flex-row hero-overlay bg-opacity-60 h-[500px] text-white">
                        <img src={doctor} className="lg:w-1/2 hidden md:block -mt-[125px] rounded-lg bottom-0" alt='' />
                        <div className='lg:w-1/2 lg:pl-5'>
                            <h6>Appointment</h6>
                            <h1 className="text-5xl font-bold">Make an appointment Today</h1>
                            <p className="py-6 lg:pr-10">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                            <button className="btn text-white bg-gradient-to-r from-primary to-secondary">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Appoinment;