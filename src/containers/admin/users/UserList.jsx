import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import Header from "../../../components/admin/Header";
import Sidebar from '../../../components/admin/Sidebar';
import Footer from "../../../components/admin/Footer";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import AvatarComponent from '../../../components/common/Avatar';

const UserList = () => {
    const [allUsers, setAllUsers] = useState("");
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
        //dispatch(getLeadsContent());
        getAllUsers();
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
     * Manage Status Update of user
     * 
     * @param id
     * @return Object|null
     * 
    */
    const handleStatusUpdate = (id) => {
        console.log('Update id: ',id);
    }
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
        console.log('Update id: ',id);
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
        console.log('Update id: ',id);
    }
    /***********************************************************************/
    /***********************************************************************/
    
    /**
     * Get Users courses list
     * 
     */
     const getAllUsers = () => {
        axios.get('user/get-all-users').then(response => {
                toast.dismiss();
    
                if (response.data) {
                    console.log(response.data)
                    if(response.data.status) {
                        setAllUsers(response.data.data);
                        console.log(response.data.data)
                        var usersData = response.data.data;
                        let usersDataArray = [];
                        usersData.forEach(function (value) {
                            usersDataArray.push({
                                first_name: value.first_name,
                                last_name: value.last_name,
                                email: value.email,
                                role: value.role,
                                profile_image_url: (value.profile_image_url !=null) ? value.profile_image_url : <AvatarComponent />,
                                isActive: (value.isActive === true) ? <div className="flex items-center"><div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div><span>Active</span></div> : <div className="flex items-center"><div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div><span>Inactive</span></div>,
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
                                      className="items-center px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        <svg class="svgclass w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                                        <span className="editBtn">Edit</span>
                                    </button>
                                    <button
                                      className="items-center px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                      onClick={() => handleDeleteSeletedData(row._id)}
                                    >
                                        <svg class="svgclass w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                      <span className="deleteBtn">Delete</span>
                                    </button>
                                  </>
                                ),
                              },
                           
                          ];
                        setColumns(columnsData);
                        setOrderDataSet(usersDataArray);  
                    }
                    
                }
            }).catch(error => {
                toast.dismiss();
                if (error.response) {
                    toast.error('Data is not available', { position: "top-center",autoClose: 3000 });
                }
            });
        
    }
    /***********************************************************************/
    /***********************************************************************/
    
    return(
        <>
            <Header />
            <h1>Users</h1>
            <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Sidebar />
                <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
                    <main>
                       
                        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                            <div className="w-full mb-1">
                                <div className="mb-4">
                                    <nav className="flex mb-5" aria-label="Breadcrumb">
                                        <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                                            <li className="inline-flex items-center">
                                                <Link to={"#"} className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                                                    <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                                    Home
                                                </Link>
                                            </li>
                                            <li>
                                                <div className="flex items-center">
                                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                                    <Link to={"#"} className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Users</Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center">
                                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                                    <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">List</span>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>
                                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All users</h1>
                                </div>
                                <div className="sm:flex">
                                    {/*<div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                                        <form className="lg:pr-3" action="#" method="GET">
                                            <label for="users-search" className="sr-only">Search</label>
                                            <div className="relative mt-1 lg:w-64 xl:w-96">
                                                <input type="text" name="email" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for users" />
                                            </div>
                                        </form>
                                        <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
                                            <Link to={"#"} className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
                                            </Link>
                                            <Link to={"#"} className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                            </Link>
                                            <Link to={"#"} className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                                            </Link>
                                            <Link to={"#"} className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                                            </Link>
                                        </div>
                                    </div>*/}
                                    <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                                        <button type="button" data-modal-target="add-user-modal" data-modal-toggle="add-user-modal" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                            Add user
                                        </button>
                                        {/*<Link to={"#"} className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                                            <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"></path></svg>
                                            Export
                                        </Link>*/}
                                    </div>
                                </div>
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
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                </Link>
                                <Link to={"#"} className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                </Link>
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-20</span> of <span className="font-semibold text-gray-900 dark:text-white">2290</span></span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Link to={"#"} className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <svg className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                    Previous
                                </Link>
                                <Link to={"#"} className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Next
                                    <svg className="w-5 h-5 ml-1 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                </Link>
                            </div>
                        </div>*/}


                        <div className="fixed left-0 right-0 z-50 items-center justify-center hidden overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full" id="edit-user-modal">
                            <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                                    <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                                        <h3 className="text-xl font-semibold dark:text-white">
                                            Edit user
                                        </h3>
                                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-toggle="edit-user-modal">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                                        </button>
                                    </div>
                                    
                                    <div className="p-6 space-y-6">
                                        <form action="#">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label for="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                                    <input type="text" name="first-name" value="Bonnie" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bonnie" required />
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label for="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                                    <input type="text" name="last-name" value="Green" id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Green" required />
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                    <input type="email" name="email" value="bonnie@flowbite.com" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example@company.com" required />
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label for="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                                    <input type="text" name="position" value="React Developer" id="position" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. React developer" required />
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label for="current-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                                                    <input type="password" name="current-password" value="••••••••" id="current-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required />
                                                </div>
                                                <div className="col-span-6 sm:col-span-3">
                                                    <label for="new-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                                    <input type="password" name="new-password" value="••••••••" id="new-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required />
                                                </div>
                                                <div className="col-span-6">
                                                    <label for="biography" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Biography</label>
                                                    <textarea id="biography" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Full-stack web developer. Open-source contributor."> Full-stack web developer. Open-source contributor."</textarea>
                                                </div>
                                            </div> 
                                        
                                            <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                                                <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Save all</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="fixed left-0 right-0 z-50 items-center justify-center hidden overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full" id="add-user-modal">
                                <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                                            <h3 className="text-xl font-semibold dark:text-white">
                                                Add new user
                                            </h3>
                                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-toggle="add-user-modal">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                                            </button>
                                        </div>
                                        
                                        <div className="p-6 space-y-6">
                                            <form action="#">
                                                <div className="grid grid-cols-6 gap-6">
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label for="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                                        <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bonnie" required />
                                                    </div>
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label for="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                                        <input type="text" name="last-name" id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Green" required />
                                                    </div>
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                        <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example@company.com" required />
                                                    </div>
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label for="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                                        <input type="text" name="position" id="position" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. React developer" required />
                                                    </div>
                                                    <div className="col-span-6">
                                                        <label for="biography" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Biography</label>
                                                        <textarea id="biography" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="👨‍💻Full-stack web developer. Open-source contributor."></textarea>
                                                    </div>
                                                </div> 
                                            
                                                <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                                                    <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Add user</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="fixed left-0 right-0 z-50 items-center justify-center hidden overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full" id="delete-user-modal">
                                    <div className="relative w-full h-full max-w-md px-4 md:h-auto">
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                                            
                                            <div className="flex justify-end p-2">
                                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-hide="delete-user-modal">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                                                </button>
                                            </div>
                                            
                                            <div className="p-6 pt-0 text-center">
                                                <svg className="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
                                                <Link to={"#"} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                                                    Yes, I'm sure
                                                </Link>
                                                <Link to={"#"} className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700" data-modal-hide="delete-user-modal">
                                                    No, cancel
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </div>    
            </div>
        </>        
    );
}

export default UserList;