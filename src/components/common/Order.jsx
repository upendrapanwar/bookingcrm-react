import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Loader from "../../components/common/Loader";

const Order = () => {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    // Retrieve order details from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orderDetails'));
    setOrderDetails(savedOrders);
  }, []);

  return (
    <>
      <Header />
      <div className="font-sans bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">Checkout</h2>
          </div>
          <h1 className="mt-6 text-2xl font-semibold">Order Summary</h1>
          <div className="mt-8">
            {orderDetails.length > 0 ? (
              <div className="grid md:grid-cols-1 gap-4">
                {orderDetails.map((order, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                    <h3 className="text-xl font-bold text-gray-700">Order #{index + 1}</h3>
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-gray-600">Customer Information</h4>
                      <p><strong>First Name:</strong> {order.firstName}</p>
                      <p><strong>Last Name:</strong> {order.lastName}</p>
                      <p><strong>Email:</strong> {order.email}</p>
                      <p><strong>Phone Number:</strong> {order.phoneNumber}</p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-gray-600">Address</h4>
                      <p><strong>Company Name:</strong> {order.companyName}</p>
                      <p><strong>Street Address:</strong> {order.streetAddress}, {order.flat}</p>
                      <p><strong>City:</strong> {order.city}</p>
                      <p><strong>County:</strong> {order.county}</p>
                      <p><strong>Country:</strong> {order.country}</p>
                      <p><strong>Postcode:</strong> {order.postcode}</p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-gray-600">Payment Information</h4>
                      <p><strong>Card Number:</strong> **** **** **** {order.cardNumber.slice(-4)}</p>
                      <p><strong>Expiry Date:</strong> {order.expiryDate}</p>
                      <p><strong>CVV:</strong> ***</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No orders found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;



// import React from 'react';
// import Header from './Header';
// import Footer from './Footer';

// const Order = () => {
//   return (
//     <>
//      <Header />
//      <div className="font-sans bg-white p-4">
//                 <div className="max-w-4xl mx-auto">
//                     <div className="text-center">
//                         <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">Checkout</h2>
//                     </div>
//                         <h1>Order </h1>
//                     <div className="mt-12">
//                         <div className="grid md:grid-cols-3 gap-4">
//                             <div className="mt-12">

//                             </div>
//                             </div>
//                     </div>
//                 </div>
//             </div>
//      <Footer />
//     </>
//   )
// }

// export default Order
