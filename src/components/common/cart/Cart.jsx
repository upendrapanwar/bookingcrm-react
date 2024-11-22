import React from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '../../../store/reducers/cart-reducer';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.cart || []);
    const totalPrice = cart.reduce((total, item) => total + item.regular_price * item.quantity, 0);

    const handleCheckoutStripe = () => {
        navigate("/checkout");
    };

    const handleAddCourse = () => {
        navigate("/");
    };

    return (
        <>
            <Header />
            <div className="bg-gray-100 h-screen py-8">
                <div className="container mx-auto px-4">
                    {/* <h1 className="text-2xl font-semibold my-4">Shopping Cart</h1> */}
                    {cart.length > 0 ? (
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-3/4">
                                <div className="bg-white rounded-lg shadow-md p-6 mb-4 mt-5 mb-5">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="p-4 border">Image</th>
                                                <th className="p-4 border">Course</th>
                                                <th className="p-4 border">Price</th>
                                                <th className="p-4 border">Quantity</th>
                                                <th className="p-4 border">Total</th>
                                                <th className="p-4 border">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item) => (
                                                <tr key={item.id} className="border-t">
                                                    <td className="p-4 flex items-center">
                                                        <img
                                                            className="h-16 w-16 mr-4"
                                                            src={item.course_image || "https://via.placeholder.com/150"}
                                                            alt="Product image"
                                                        />
                                                    </td>
                                                    <td className="p-4"><b>{item.course_title}</b></td>

                                                    <td className="p-4"><b>£&nbsp;</b>{item.regular_price}</td>
                                                    <td className="p-4">
                                                        <div className="flex items-center">
                                                            <button
                                                                className="border rounded-md py-1 px-3 mr-2"
                                                                onClick={() => dispatch(decrementQuantity(item.id))}
                                                            >
                                                                -
                                                            </button>
                                                            <span className="text-center w-8">{item.quantity}</span>
                                                            <button
                                                                className="border rounded-md py-1 px-3 ml-2"
                                                                onClick={() => dispatch(incrementQuantity(item.id))}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="p-4"><b>£&nbsp;</b>{(item.regular_price * item.quantity).toFixed(2)}</td>
                                                    <td className="p-4">
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => dispatch(removeItem(item.id))}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="md:w-1/4 mt-5 mb-5">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-lg font-semibold mb-4">Basket totals</h2>
                                    <div className="flex justify-between mb-2">
                                        <span>Subtotal</span>
                                        <span><b>£&nbsp;</b>{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>VAT</span>
                                        <span><b>£&nbsp;</b>{(totalPrice * 0.1).toFixed(2)}</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between mb-2">
                                        <span className="font-semibold">Total</span>
                                        <span className="font-semibold"><b>£&nbsp;</b>{(totalPrice * 1.1).toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        className="bg-blue text-white font-bold py-2 px-4 rounded w-full"
                                        onClick={handleCheckoutStripe}
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mt-10">
                            <h2 className="text-lg font-semibold mb-4">Your cart is empty!</h2>
                            <button
                                className="bg-blue text-white font-bold py-2 px-4 rounded"
                                onClick={handleAddCourse}
                            >
                                Add Course
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;

