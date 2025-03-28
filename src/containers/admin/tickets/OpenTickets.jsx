import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import AvatarComponent from '../../../components/common/Avatar';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Loader from '../../../components/common/Loader';
import { Select, Button, Modal } from "flowbite-react";
import { HiOutlineTicket, HiOutlineTrash, HiMail, HiOutlineExclamationCircle } from "react-icons/hi";
import BgColorIconComponent from '../../../components/common/BgColorIcon';

const OpenTickets = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState([false]);
    const [openTickets, setOpenTickets] = useState([false]);
    const [orderDataSet, setOrderDataSet] = useState([]);
    const [columns, setColumns] = useState([]);
    const validEmail = localStorage.getItem('valid_email');
    const [selectedRows, setSelectedRows] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const customStyles = {
        pagination: {
            tableWrapper: {
                style: {
                    overflowX: 'auto', // Enables horizontal scroll
                },
            },
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
        getOpenTickets();
    }, []);

    /***********************************************************************/
    /***********************************************************************/
    /**
     * Change status of ticket
      
     * @param id
     * @return Object|null
     */
    const handleStatusChange = (event, id) => {
        const { value } = event.target;
        const requestData = {
            ticketId: id,
            status: value
        };
        console.log('requestData=', requestData);

        if (requestData) {
            axios.post(`admin/change-ticket-status`, requestData).then(response => {
                if (response.data) {
                    console.log(response.data);
                    toast.success(`Status changed successfully!`, { position: "top-center", autoClose: 3000 });
                    getOpenTickets('statusChanged');
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
    /**
     * Get open ticket list
     * 
     */
    const getOpenTickets = (condition) => {
        setLoading(true);
        axios.get(`admin/get-open-tickets`).then(response => {
            if (response.data) {
                console.log(response.data)
                if (response.data.status) {
                    setOpenTickets(response.data.data);
                    console.log(response.data.data)
                    var ticketsData = response.data.data;
                    let ticketsDataArray = [];
                    ticketsData.forEach(function (value) {
                        ticketsDataArray.push({
                            id: value.id,
                            first_name: value.firstName,
                            last_name: value.lastName,
                            email: value.email,
                            subject: value.subject,
                            screenshot: (value.screenshot != null) ? value.screenshot : <AvatarComponent />,
                            //status: (value.status) ? <div className="flex items-center"><div className="h-2.5 w-2.5 rounded-full bg-red-600 mr-2"></div><span>{value.status}</span></div> : <div className="flex items-center"><div className="h-2.5 w-2.5 rounded-full bg-red-600 mr-2"></div><span></span></div>,
                            status: value.status,
                            updatedAt: value.updatedAt,
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
                            cell: (row) => {
                                var bgColoricon = '';
                                bgColoricon = 'bg-red-600';
                                return row.status ? (
                                <BgColorIconComponent icon={bgColoricon} status={row.status}/>
                                ) : (<div></div>);
                            },
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

                                </>
                            ),
                        },

                    ];
                    setColumns(columnsData);
                    setOrderDataSet(ticketsDataArray);
                }

            }
            setLoading(false);
        }).catch(error => {
            setLoading(false);
            setColumns([]);
            setOrderDataSet([]);
            if (error.response && typeof condition === undefined) {
                toast.error('Data is not available', { position: "top-center", autoClose: 3000 });
            }
        });

    }
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
        await axios.post(`admin/delete-selected-tickets`, selectedRows).then(response => {
            if (response.data) {
                console.log(response.data);
                toast.success(`Ticket deleted successfully!`, { position: "top-center", autoClose: 3000 });
                setSelectedRows([]);
                getOpenTickets();
            }
        }).catch(error => {

            if (error.response) {
                toast.error('Something went wrong! Try Again!', { position: "top-center", autoClose: 3000 });
            }
        });
        console.log('selectedRows=', selectedRows);

    };

    /**
     * Navigates to reply ticket page
     * 
     */
    const handleReplyTicket = (id) => {
        console.log('id=', id)
        if (id) {
            navigate(`/reply-ticket/${id}`);
        }

    }
    /***********************************************************************/
    /***********************************************************************/
    /**
    * Navigate to raise a ticket page
    * 
    */
    const handleAddTicket = () => {
        navigate('/contact-us/1');
    }
    /***********************************************************************/
    /***********************************************************************/
    return (
        <>
            <div className="">
                {loading === true ? <Loader /> : ''}
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


                                    </div>
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
                            ) : <div class="overflow-hidden shadow">No Record Found!</div>}

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

export default OpenTickets;
