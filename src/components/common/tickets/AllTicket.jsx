import React, { useEffect, useState } from 'react';
import axios from "axios";
import AvatarComponent from '../../../components/common/Avatar';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

const AllTicket = () => {
    //const navigate = useNavigate();
    
    const [loading, setLoading] = useState([false]);
    const [allTickets, setAllTickets] = useState("");
    const [columns, setColumns] = useState([]);
    const [orderDataSet, setOrderDataSet] = useState([]);

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
    /**
     * Manage Update of user by id
     * 
     * @param id
     * @return Object|null
     * 
    */
    const handleEdit = (id) => {
        //setShowEditUserModal(false);
        console.log('Update id: ', id);
    }
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Manage delete selected user by id
     * 
     * @param id
     * @return Object|null
     * 
    */
    const handleDeleteSeletedData = (id) => {
        console.log('Update id: ', id);
    }
    /***********************************************************************/
    /***********************************************************************/
    /**
     * Get Users courses list
     * 
     */
     const getAllTickets = () => {
        axios.get('user/get-all-tickets').then(response => {
            if (response.data) {
                console.log(response.data)
                if (response.data.status) {
                    setAllTickets(response.data.data);
                    console.log(response.data.data)
                    var ticketsData = response.data.data;
                    let ticketsDataArray = [];
                    ticketsData.forEach(function (value) {
                        ticketsDataArray.push({
                            first_name: value.firstName,
                            last_name: value.lastName,
                            email: value.email,
                            subject: value.subject,
                            screenshot: (value.screenshot != null) ? value.screenshot : <AvatarComponent />,
                            status: (value.status) ? <div className="flex items-center"><div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div><span>{value.status}</span></div> : <div className="flex items-center"><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div><span></span></div>,
                            createdAt: value.createdAt
                        });
                    });
                    var columnsData = [
                        {
                            name: "",
                            selector: (row, i) => row.profile_image_url,
                            cell: (row) => row.profile_image_url,
                            sortable: false,
                        },
                        {
                            name: "First Name",
                            selector: (row, i) => row.first_name,
                            cell: (row) => <span>{row.first_name}</span>,
                            sortable: true,
                        },
                        {
                            name: "Last Name",
                            selector: (row, i) => row.last_name,
                            cell: (row) => <span>{row.last_name}</span>,
                            sortable: true,
                        },
                        {
                            name: "Email",
                            selector: (row, i) => row.email,
                            cell: (row) => <span>{row.email}</span>,
                            sortable: true,
                        },
                        {
                            name: "Role",
                            selector: (row, i) => row.role,
                            cell: (row) => row.role,
                            sortable: true,
                        },

                        {
                            name: "Status",
                            selector: (row, i) => row.isActive,
                            cell: (row) => row.isActive,
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
                                    <button
                                        onClick={() => handleEdit(row.id)}
                                        className="mr-10 items-center px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        <svg class="svgclass w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                        <span className="editBtn">Edit</span>
                                    </button>
                                    <button
                                        className="items-center px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                        onClick={() => handleDeleteSeletedData(row._id)}
                                    >
                                        <svg class="svgclass w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                        <span className="deleteBtn">Delete</span>
                                    </button>
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
            </div>
        </>

    );
};

export default AllTicket;
