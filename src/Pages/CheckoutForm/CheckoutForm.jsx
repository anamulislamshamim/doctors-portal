import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Loading from '../Shared/Loading/Loading';
import { toast } from 'react-toastify';
const CheckoutForm = ({ bookData }) => {
    const [ loading, setLoading ] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const [cardError, setCardError] = useState("");
    const [success, setSuccess] = useState(false);
    const [ processing, setProcessing ] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:4000/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json",
                 authorization:`bearer ${ localStorage.getItem("auth_token") }`
        },
          body: JSON.stringify({ price:bookData.price })
        })
          .then((res) => res.json())
          .then((data) => {
            setClientSecret(data.clientSecrent);
            setLoading(false);
          });
      }, [bookData.price]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        if (!stripe || !elements || processing) {
            return;
        };
        const card = elements.getElement(CardElement);
        if(card===null){
            return;
        };
        const { error } = await stripe.createPaymentMethod({
            type:'card',
            card
        });
        if(error){
            setCardError(error.message);
            console.log(error);
        }else{
            setCardError("");
        };
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: bookData.patient,
                  email: bookData.email
                },
              },
            },
          );
          if (confirmError) {
            setCardError(confirmError.message);
            return;
          };
          // id:transaction_id, amount, status
          if(paymentIntent.status === "succeeded"){
            const transactionInfo = {
                amount: paymentIntent.amount,
                transition_id: paymentIntent.id,
                payment_method_types:paymentIntent.payment_method_types[0],
                payment_status: paymentIntent.status
            };
            console.log("transaction: ", transactionInfo);
            fetch(`http://localhost:4000/transaction-info`, {
                method: "POST",
                headers: { "Content-Type": "application/json",
                       authorization:`bearer ${ localStorage.getItem("auth_token") }`
              },
                body: JSON.stringify(transactionInfo)
              }).then(res => res.json())
            .then(() => {
                setSuccess(true);
                setTransactionId( paymentIntent.id );
                event.target.reset();
            }).catch(() => {
                toast.error("Your payment doesn't complete. Please try again!");
            })
          };
          console.log("payment info: ", paymentIntent);
    };
    
    if(loading){
        return <Loading />
    };
    console.log("client ", clientSecret);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='bg-primary px-5 py-1 mt-3 mb-2 text-white font-semibold rounded' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                {
                    cardError && <p className='text-red-700 font-semibold'>{ cardError }</p>
                }
            </form>
            {
                success && <>
                    <h3>Your payment successful!</h3>
                    <p>Your transaction id: { transactionId }</p>
                </>
            }
        </div>
    );
};

export default CheckoutForm;