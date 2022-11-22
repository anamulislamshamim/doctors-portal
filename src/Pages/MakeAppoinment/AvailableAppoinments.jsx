import React from 'react';
import { format } from "date-fns";
import { useState } from 'react';
// import { useEffect } from 'react';
import AppoinmentCard from './AppoinmentCard';
import AppoinmentModal from './AppoinmentModal';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading/Loading';
const AvailableAppoinments = ({ selectedDate }) => {
    // const [appoinments, setAppoinments] = useState([]);
    const [option, setOption] = useState({});
    const date = format(selectedDate, "PP");
    const { isLoading, error, data: appoinments, refetch } = useQuery({
        queryKey: ["appoinmentOptions", date],
        queryFn: () => fetch(`http://localhost:4000/appoinmentOptions?date=${date}`).then(res => res.json())
    });
    if (isLoading) return <Loading />;
    if (error) return "An error has been occured";
    // useEffect(() => {
    //     fetch("http://localhost:4000/appoinmentOptions")
    //         .then(res => res.json())
    //         .then(data => setAppoinments(data))
    // }, []);
    const appoinmentHandeler = (event) => {
        event.preventDefault();
        const form = event.target;
        const date = form.date.value;
        const name = form.name.value;
        const time = form.time.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const patient = form.patient.value;
        const price = form.price.value;
        const booking = {
            treatment: name,
            appoinmentDate: date,
            slot: time,
            patient: patient,
            email: email,
            phone: phone,
            price: price
        };
        console.log(booking);
        fetch(`http://localhost:4000/bookings`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Booking successfull!");
                    form.reset();
                    refetch();
                    setOption(null);
                }else{
                    toast.error(data.message);
                };
            })
    }
    return (
        <div>
            <h1 className='text-center text-secondary font-semibold'>Available Appointments on {format(selectedDate, 'PP')}</h1>
            <div className='grid mt-10 grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6'>
                {
                    appoinments.map(appoinment => <AppoinmentCard
                        key={appoinment._id}
                        setOption={setOption}
                        appoinment={appoinment} />)
                }
            </div>
            {option &&
                <AppoinmentModal
                    option={option}
                    appoinmentHandeler={appoinmentHandeler}
                    selected={selectedDate}
                />
            }
        </div>
    );
};

export default AvailableAppoinments;