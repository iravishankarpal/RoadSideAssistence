import React from "react";
import axios from "axios";

import styled from "styled-components";
function Payment() {
  const amount = React.useRef(null);
  const initPayment = (data) => {
    console.log("initPayment :", initPayment);
    const options = {
      key: "rzp_test_8r3BxkmGgJAiZg",
      amount: data.amount,
      currency: "INR",
      //   name: data.name,
      description: "Test Transaction",

      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          alert(data.message);
          console.log(data);
          amount.current.value = "";
        } catch (error) {
          console.log(error);
        }
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  const handlePayment = async (amount) => {
    console.log("amount", amount);
    try {
      const orderUrl = "/payment/orders";
      const { data } = await axios.post(orderUrl, { amount });
      console.log("response data data :", data.data);

      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PaymentHead>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePayment(amount.current.value);
        }}
      >
        <input type="number" ref={amount} placeholder="enter amount " />

        <button type="submit"> Pay</button>
      </form>
    </PaymentHead>
  );
}

export default Payment;
const PaymentHead = styled.div`
  form {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 10px;
    border: 1px solid #ccc;
    margin-top: 10px;

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    button {
      background-color: #ffc107;
      color: #fff;
      border: none;
      padding: 10px;
    }
  }
`;
