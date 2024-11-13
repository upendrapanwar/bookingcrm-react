import React from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from '../../../store/reducers/cart-reducer';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.cart || []);
    const totalPrice = cart.reduce((total, item) => total + item.regular_price * item.quantity, 0);

    const columns = [
        {
            name: 'Product',
            selector: (row) => row.course_title,
            cell: (row) => (
                <div className="flex items-center">
                    <img className="h-16 w-16 mr-4" src={row.course_image || "https://via.placeholder.com/150"} alt="Product image" />
                    <span className="font-semibold">{row.course_title}</span>
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Price',
            selector: (row) => row.regular_price,
            cell: (row) => `£${row.regular_price}`,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: (row) => row.quantity,
            cell: (row) => (
                <div className="flex items-center">
                    <button
                        className="border rounded-md py-2 px-4 mr-2"
                        onClick={() => dispatch(decrementQuantity(row.id))}
                    >
                        -
                    </button>
                    <span className="text-center w-8">{row.quantity}</span>
                    <button
                        className="border rounded-md py-2 px-4 ml-2"
                        onClick={() => dispatch(incrementQuantity(row.id))}
                    >
                        +
                    </button>
                </div>
            ),
        },
        {
            name: 'Total',
            selector: (row) => row.regular_price * row.quantity,
            cell: (row) => `£${(row.regular_price * row.quantity).toFixed(2)}`,
            sortable: true,
        },
        {
            name: '',
            cell: (row) => (
                <button
                    className="text-red-600 ml-2"
                    onClick={() => dispatch(removeItem(row.id))}
                >
                    &times;
                </button>
            ),
        },
    ];

    const dataTable = {
        columns,
        data: cart,
        export: false,
        print: false,
    };


    const handleCheckOut = async() => {
        navigate("/checkout");
    }

    return (
        <>
            <Header />
            <div className="bg-gray-100 h-screen py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4 mt-5 mb-5">
                                <DataTableExtensions {...dataTable}>
                                    <DataTable
                                        noHeader
                                        pagination
                                        highlightOnHover
                                        defaultSortField="course_title"
                                        striped
                                    />
                                </DataTableExtensions>
                            </div>
                        </div>
                        <div className="md:w-1/4 mt-5 mb-5">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">Basket totals</h2>
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>£{totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>VAT</span>
                                    <span>£{(totalPrice * 0.1).toFixed(2)}</span>
                                </div>
                                <hr className="my-2" />
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-semibold">£{(totalPrice * 1.1).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                 <button className="bg-blue text-white font-bold py-2 px-4 rounded w-full" onClick={handleCheckOut}>
                                   Proceed to Checkout
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart;
