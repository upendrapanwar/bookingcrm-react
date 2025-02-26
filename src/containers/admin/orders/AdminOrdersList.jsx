import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from "../../../components/admin/Header";
import Sidebar from '../../../components/admin/Sidebar';
import Footer from "../../../components/admin/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import AvatarComponent from '../../../components/common/Avatar';
import EmptyImage from '../../../assets/images/EmptyImage.png';
import Loader from "../../../components/common/Loader";


const AdminOrdersList = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState([false]);
    const [columns, setColumns] = useState([]);
    const [orderDataSet, setOrderDataSet] = useState([]);
    const [orders,setOrders] = useState([]);
    const customStyles = {
        pagination: {
            style: {
                display: 'flex',
                justifyContent: 'center',
            },
            pageButtonsStyle: {
                padding: '10px 15px',
                margin: '0 5px',
                backgroundColor: '#4caf50',
                color: '#fff',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
            },
            pageButtonHover: {
                backgroundColor: '#45a049',
            },
            pageButtonDisabled: {
                backgroundColor: '#ccc',
                cursor: 'not-allowed',
            },
        },

    };
    // Custom text for the pagination buttons
    const paginationComponentOptions = {
        rowsPerPageText: 'Rows per page:',
        rangeSeparatorText: 'of',
        noRowsPerPage: false,
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All',
        previousPageText: '<< Previous',  // Custom Previous button text
        nextPageText: 'Next >>',          // Custom Next button text
    };
    useEffect(() => {
        //dispatch(getLeadsContent());
        getAllOrders();
    }, []);

    /***********************************************************************/
    /***********************************************************************/
    /**
     * Handle datatable checkbox check
     * 
     */
    const handleChange = (state) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', state.selectedRows);
    };
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Navigate To Add Courses 
     * 
     * @param navigate
     * 
    */
    const handleButtonClick = () => {
        navigate('/admin/admin-CreateInstructor');
    };
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Manage Status Update of user
     * 
     * @param id
     * @return Object|null
     * 
    */
    // const handleStatusUpdate = (id) => {
    //     console.log('Update id: ', id);
    // }
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Manage Update of Courses by id
     * 
     * @param id
     * @return Object|null
     * 
    */
    const handleEdit = (id) => {
        navigate(`/admin/admin-EditInstructor?id=${id}`);
    }
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Manage more information of Courses by id
     * 
     * @param id
     * @return Object|null
     * 
    */
    const handleMoreInformation = (id) => {
        navigate(`/admin/admin-Order-MoreInformation?id=${id}`);
    }
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Manage delete selected course by id
     * 
     * @param id
     * @return Object|null
     * 
    */
    const handleStatusUpdate = (id) => {
        console.log('Update id: ', id);
        let instructorId = {
            id:id,
        }
        setLoading(true);
        
        axios
            .put("admin/update_status_instructor",instructorId)
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                   // console.log('Deleted Instructor-----', response)
                    toast.success(response.data.message, { autoClose: 3000 });
                    getAllOrders();
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                toast.dismiss();
                if (error.response) {
                    toast.error(error.response.data.message, { autoClose: 3000 });
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            });
    }
    /***********************************************************************/
    /***********************************************************************/

     /**
     * Manage delete selected course by id
     * 
     * @param id
     * @return Object|null
     * 
    */
     const handleDeleteSeletedData = (id) => {
        console.log('delete id: ', id);
        let orderId = {
            id:id,
        }
        setLoading(true);
        
        axios.delete('admin/delete_order', { data: { orderId } })
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                   // console.log('Deleted Instructor-----', response)
                    toast.success(response.data.message, { autoClose: 3000 });
                    getAllOrders();
                } else {
                    toast.error(response.data.message, { autoClose: 3000 });
                }
            })
            .catch((error) => {
                toast.dismiss();
                if (error.response) {
                    toast.error(error.response.data.message, { autoClose: 3000 });
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 300);
            });
    }
    /***********************************************************************/
    /***********************************************************************/

    /**
     * Get  courses list
     * 
     */
    const getAllOrders = () => {
        axios.get('admin/get_orders').then(response => {
            toast.dismiss();

            if (response.data) {
                console.log('response---order--',response.data)
                setOrders(response.data.data);
                    console.log(response.data.data)
                    var ordersData = response.data.data;
                    let ordersDataArray = [];
                    ordersData.forEach(function (value) {
                        // const isActiveStatus = Boolean(value.isActive);
                        const student = value.studentId ? `${value.studentId.first_name || 'N/A'} ${value.studentId.last_name || ''}`.trim() : "N/A";
                        ordersDataArray.push({
                            Order_id: String(value.id || ''),
                            paymentIntent_id: String(value.paymentIntentID ||''),
                            paymentStatus: String(value.paymentStatus || ''),
                            studentName: student || '' ,
                            amount: String(value.amount || ''),
                            toPay: String(value.toPay || ''),
                            futurePay: String(value.futurePay || ''),
                            createdAt: String(value.createdAt || ''),
                            
                        });
                        
                    });
                    var columnsData = [
                       
                        {
                            name: "OrderId",
                            selector: (row, i) => row.Order_id,
                            cell: (row) => <span>{row.Order_id}</span>,
                            sortable: true,
                        },
                        {
                            name: "PaymentIntentId",
                            selector: (row, i) => row.paymentIntent_id,
                            cell: (row) => <span>{row.paymentIntent_id}</span>,
                            sortable: true,
                            // width: '260px',
                        },
                        {
                            name: "Student Name",
                            selector: (row, i) => row.studentName,
                            cell: (row) => <span>{row.studentName}</span>,
                            sortable: true,                          
                        },
                        {
                            name: "PaymentStatus",
                            selector: (row, i) => row.paymentStatus,
                            cell: (row) => row.paymentStatus,
                            sortable: true,
                        },
                        {
                            name: "Amount",
                            selector: (row) => row.amount,
                            cell: (row) => {
                               
                                const amount = parseFloat(row.amount) || 0; 
                                const futurePay = row.futurePay ? parseFloat(row.futurePay.trim()) : null;
                        
                                const formattedAmount = amount.toFixed(2);
                                const formattedFuturePay = futurePay !== null ? futurePay.toFixed(2) : null;
                        
                                return formattedFuturePay
                                    ? `${formattedAmount} (${formattedFuturePay})`
                                    : formattedAmount;
                            },
                            sortable: true,
                        },
                        {
                            name: "Orderd At",
                            selector: (row, i) => row.createdAt,
                            cell: (row) => {
                                const date = new Date(row.createdAt);
                                const day = date.getDate();
                                const month = date.toLocaleString('en-us', { month: 'short' });
                                const year = date.getFullYear();
                                const formattedDate = `${day} ${month}, ${year}`;
                                return <span>{formattedDate}</span>;
                            },
                            sortable: true,
                        },
                      
                        {
                            name: "Actions",
                            cell: (row) => (
                                <>
                                
                                    <button
                                        className="mr-10 items-center px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                        onClick={() => handleMoreInformation(row.Order_id)}
                                    >
                                        {/* <svg class="svgclass w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg> */}
                                        <span className="myactiveBtn">More</span>
                                    </button>
                                    <button
                                        className="items-center px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                        onClick={() => handleDeleteSeletedData(row.Order_id)}
                                    >
                                        <svg class="svgclass w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                        <span className="deleteBtn">Delete</span>
                                    </button>
                                </>
                            ),
                        },

                    ];
                    setColumns(columnsData);
                    setOrderDataSet(ordersDataArray);
                }
            
        }).catch(error => {
            toast.dismiss();
            if (error.response) {
                toast.error('Data is not available', { position: "top-center", autoClose: 3000 });
            }
        });

    }
    /***********************************************************************/
    /***********************************************************************/

    return (
        <>
            {loading === true ? <Loader /> : ''}
            <Header />
            <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Sidebar />
                <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900 admin-main-container">
                    <main>

                        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                            <div className="w-full mb-1">
                                <div className="mb-4">

                                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All Orders</h1>
                                </div>
                                {/* <div className="sm:flex">
                                    
                                    <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                                        <button
                                            type="button" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            onClick={handleButtonClick}
                                        >
                                            <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                                            </svg>
                                            Add Instructor
                                        </button>
                                       
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="overflow-x-auto w-full">
                                <div className="min-w-full align-middle">
                                    <div class="overflow-hidden shadow">
                                        <DataTableExtensions
                                            columns={columns}
                                            data={orderDataSet}
                                        >
                                            <DataTable
                                                title="Table"
                                                selectableRows
                                                noHeader
                                                defaultSortField="id"
                                                defaultSortAsc={false}
                                                pagination
                                                paginationComponentOptions={paginationComponentOptions}
                                                highlightOnHover
                                                Clicked
                                                Selected={handleChange}
                                               customStyles={customStyles}
                                            />
                                        </DataTableExtensions>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*<div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <Link to={"#"} className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                </Link>
                                <Link to={"#"} className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                </Link>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-20</span> of <span className="font-semibold text-gray-900 dark:text-white">2290</span></span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Link to={"#"} className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    Previous
                                </Link>
                                <Link to={"#"} className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Next
                                    <svg className="w-5 h-5 ml-1 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                </Link>
                            </div>
                        </div>*/}

                        {/*<div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center mb-4 sm:mb-0">
                                <Link to={"#"} className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                </Link>
                                <Link to={"#"} className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                </Link>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-20</span> of <span className="font-semibold text-gray-900 dark:text-white">2290</span></span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Link to={"#"} className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    Previous
                                </Link>
                                <Link to={"#"} className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Next
                                    <svg className="w-5 h-5 ml-1 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                </Link>
                            </div>
                        </div>*/}
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default AdminOrdersList;