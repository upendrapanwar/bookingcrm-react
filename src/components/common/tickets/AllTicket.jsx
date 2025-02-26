import React, { useEffect, useState } from 'react';
import axios from "axios";
import AvatarComponent from '../../../components/common/Avatar';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useNavigate } from "react-router-dom";
import { Select, Button, Modal } from "flowbite-react";
import { HiOutlineTicket, HiOutlineTrash, HiMail, HiOutlineExclamationCircle } from "react-icons/hi";

const AllTicket = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState([false]);
    const [allTickets, setAllTickets] = useState("");
    const [columns, setColumns] = useState([]);
    const [orderDataSet, setOrderDataSet] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const customStyles = {
        tableWrapper: {
            style: {
              overflowX: 'auto', // Enables horizontal scroll
            },
          },
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
        getAllTickets();
        
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
    const handleSelectedRowsChange = ({ selectedRows }) => {
        const selectedIds = selectedRows.map(row => row.id);
        setSelectedRows(selectedIds);
    };
    // Handle multiple row deletion
    const deleteSelectedRows = async () => {
        setOpenModal(false);
        await axios.post(`user/delete-selected-tickets`,selectedRows).then(response => {
            if (response.data) {
                console.log(response.data);
                toast.success(`Ticket deleted successfully!`, { position: "top-center", autoClose: 3000 });
                setSelectedRows([]);
                getAllTickets();
            }
        }).catch(error => {
            
            if (error.response) {
                toast.error('Something went wrong! Try Again!', { position: "top-center", autoClose: 3000 });
            }
        });
        console.log('selectedRows=',selectedRows);
        
    };
    /**
     * Navigates to reply ticket page
     * 
     */
    const handleReplyTicket = (id) => {
        console.log('id=',id)
        if(id) {
            navigate(`/reply-ticket/${id}`);
        }
        
    }
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Change status of ticket
      
     * @param id
     * @return Object|null
     */
    const handleStatusChange = (event,id) => {
        const { value } = event.target;
        const requestData = {
            ticketId: id,
            status: value
        };
        console.log('requestData=',requestData);
        
        if(requestData) {
            axios.post(`user/change-ticket-status`,requestData).then(response => {
                if (response.data) {
                    console.log(response.data);
                    toast.success(`Status changed successfully!`, { position: "top-center", autoClose: 3000 });
                    getAllTickets();
                }
            }).catch(error => {
                
                if (error.response) {
                    toast.error('Data is not available', { position: "top-center", autoClose: 3000 });
                }
            });
            
        }
        
    }
    /***********************************************************************/
    /***********************************************************************/
    const handleAddTicket = () => {
        navigate('/contact-us/1');
    }
    /**
     * Get all ticket list
     * 
     * 
     */
    const getAllTickets = () => {
        const validEmail = localStorage.getItem('valid_email');
        axios.get(`user/get-all-tickets/${validEmail}`).then(response => {
            if (response.data) {
                console.log(response.data)
                if (response.data.status) {
                    setAllTickets(response.data.data);
                    console.log(response.data.data)
                    var ticketsData = response.data.data;
                    let ticketsDataArray = [];
                    ticketsData.forEach(function (value) {
                        var bgColoricon = '';
                        if(value.status == "open") {
                            bgColoricon = 'bg-red-600';
                        }
                        if(value.status == "waiting") {
                            bgColoricon = 'bg-yellow-400';
                        }
                        if(value.status == "closed") {
                            bgColoricon = 'bg-green-400';
                        }
                        console.log('bgColoricon=',bgColoricon);
                        console.log('status=',value.status);
                        ticketsDataArray.push({
                            id:value.id,
                            first_name: value.firstName,
                            last_name: value.lastName,
                            email: value.email,
                            subject: value.subject,
                            screenshot: (value.screenshot != null) ? value.screenshot : <AvatarComponent />,
                            status: (value.status) ? <div className="flex items-center"><div className={`h-2.5 w-2.5 rounded-full ${bgColoricon} mr-2`}></div><span>{value.status}</span></div> : <div className="flex items-center"><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div><span></span></div>,
                            updatedAt:value.updatedAt,
                            createdAt: value.createdAt
                        });
                    });
                    var columnsData = [
                        {
                            name: "Name",
                            selector: (row, i) => row.first_name + + row.last_name,
                            cell: (row) => <span>{row.first_name} {row.last_name}</span>,
                            sortable: true,
                        },
                        {
                            name: "Email",
                            selector: (row, i) => row.email,
                            cell: (row) => <span>{row.email}</span>,
                            sortable: true,
                        },
                        {
                            name: "Subject",
                            selector: (row, i) => row.subject,
                            cell: (row) => row.subject,
                            sortable: true,
                        },

                        {
                            name: "Status",
                            selector: (row, i) => row.status,
                            cell: (row) => row.status,
                            sortable: true,
                        },
                        {
                            name: "Change Status",
                            
                            cell: (row) => (
                                <Select id="status" name="status" className="w-40 mr-2.5 pr-0"
                                    onChange={(event) => handleStatusChange(event, row.id)}>
                                    <option value="" disabled selected>Change Status</option>
                                    <option value="open">Open</option>
                                    <option value="waiting">Waiting</option>
                                    <option value="closed">Closed</option>
                                </Select>
                            ),
                            sortable: true,
                        },
                        {
                            name: "Updated At",
                            selector: (row, i) => row.updatedAt,
                            cell: (row) => {
                                const date = new Date(row.updatedAt);
                                const day = date.getDate();
                                const month = date.toLocaleString('en-us', { month: 'short' });
                                const year = date.getFullYear();
                                const formattedDate = `${day} ${month}, ${year}`;
                                return <span>{formattedDate}</span>;
                            },
                            sortable: true,
                        },
                        {
                            name: "Created At",
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
                                    <Button color="blue" onClick={() => handleReplyTicket(row.id)}>
                                            <HiMail className="mr-2 h-5 w-5" />
                                            Reply
                                    </Button>
                                    {/*<button onClick={() => handleReplyTicket(row.id)}  
                                        className="mr-10 items-center px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        <svg class="svgclass w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                        <span className="editBtn">Reply</span>
                                    </button>*/}
                                    
                                    
                                </>
                            ),
                        },

                    ];
                    setColumns(columnsData);
                    setOrderDataSet(ticketsDataArray);
                }

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
            <div className="">
           
                <div className="flex flex-col">
                    <div className="overflow-x-auto w-full">
                        <div className="min-w-full align-middle">
                            {orderDataSet.length > 0 ? (
                                <div class="overflow-hidden shadow">
                                    <div className="flex flex-wrap gap-2" style={{ float: 'right' }}>
                                        <Button color="blue" onClick={handleAddTicket}>
                                            <HiOutlineTicket className="mr-2 h-5 w-5" />
                                            Add Ticket
                                        </Button>
                                        <Button color="failure" disabled={selectedRows.length === 0} onClick={() => setOpenModal(true)}>
                                            <HiOutlineTrash className="mr-2 h-5 w-5" />
                                            Delete Ticket
                                        </Button>
                                        
                                        {/*<button
                                            className="items-center px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                            onClick={deleteSelectedRows}
                                            disabled={selectedRows.length === 0}
                                            
                                        >
                                            <svg class="svgclass w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                            <span className="deleteBtn">Delete</span>
                                        </button>*/}
                                    </div>
                                    
                                    {/*<button 
                                        onClick={deleteSelectedRows} 
                                        disabled={selectedRows.length === 0} // Disable if no rows are selected
                                        style={{ marginBottom: '10px' }}
                                    >
                                        Delete Selected Rows
                                    </button>*/}
                                    <div className="table-container">
                                    <DataTableExtensions
                                        columns={columns}
                                        data={orderDataSet}
                                    >
                                        <DataTable
                                            title="Table"
                                            selectableRows
                                            onSelectedRowsChange={handleSelectedRowsChange}
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
                            ):<div class="overflow-hidden shadow">No Record Found!</div>}
                        </div>
                        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                            <Modal.Header />
                            <Modal.Body>
                            <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this?
                                </h3>
                                <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={deleteSelectedRows}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    No, cancel
                                </Button>
                                </div>
                            </div>
                            </Modal.Body>
                        </Modal>    
                    </div>
                </div>
            </div>
        </>

    );
};

export default AllTicket;
