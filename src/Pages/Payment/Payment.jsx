import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(`${process.env.REACT_APP_stripe_pk}`);

const Payment = () => {
    const bookData = useLoaderData();
    console.log(bookData);
    return (
        <div>
            <h2 className='text-2xl mb-5 font-semibold'>Payment for { bookData.treatment }</h2>
            <p>Please pay ${ bookData.price } for { bookData.treatment } on { bookData.appoinmentDate }</p>
            <div className='w-2/5 mt-20'>
                <Elements stripe={ stripePromise }>
                    <CheckoutForm bookData={ bookData } />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;