import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../../components/common/Loader';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import Header from "../../../../components/admin/Header";
import Sidebar from '../../../../components/admin/Sidebar';
import Footer from "../../../../components/admin/Footer";


const AdminCategoriesList = () => {
    const navigate = useNavigate();
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));

    const [loading, setLoading] = useState([false]);
    const [allcategories, setAllCategories] = useState([]);


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
        getAllCate();
    }, []);


    const getAllCate = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/admin/getAllcategories", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${authInfo.token}`
                }
            });
            console.log("response", response);

            if (response.data.status === true && response.data.data.length > 0) {
                const cateData = response.data.data;
                setLoading(false);
                setAllCategories(cateData);
            };
        } catch (error) {
            toast.dismiss();
            if (error.response) {
                toast.error(error.response.data.message, { autoClose: 3000 });
            }
        } finally {
            setLoading(false);
        }

    };


    const handleAddCategory = () => {
        navigate("/admin/admin-CreateCategories");
    };


    const handleEdit = (row) => {
        console.log("row",row);
        navigate("/admin/admin-EditCategory", { state: { rowData: row } });   
    }


    // Define columns for DataTable
    const columns = [
        { name: "Category Name", selector: (row) => row.category, sortable: true },
        { name: "Parent", selector: (row) => row.parentCategory },
        {
            name: "Status",
            selector: (row) => row.isActive,
            cell: (row) => row.isActive === true ? (
                <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                    <span>Active</span>
                </div>
            ) : (
                <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                    <span>Inactive</span>
                </div>
            ),
            sortable: true,
        },
        // { name: "Description", selector: (row) => row.description },
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
                    //   onClick={() => handleDeleteSeletedData(row._id)}
                    >
                        <svg class="svgclass w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        <span className="deleteBtn">Delete</span>
                    </button>
                </>
            ),
        },

    ];

    const tableData = {
        columns,
        data: allcategories,
    };

    return (
        <>
            <Header />
            <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Sidebar />
                <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
                    <main>
                        {loading === true ? <Loader /> : ''}
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
                                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                                    <Link to={"#"} className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Courses</Link>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center">
                                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                                    <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Categories List</span>
                                                </div>
                                            </li>
                                        </ol>
                                    </nav>
                                    <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">All categories</h1>
                                </div>
                                <div className="sm:flex">                              
                                    <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                                        <button type="button" data-modal-target="add-user-modal" data-modal-toggle="add-user-modal" className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            onClick={() => handleAddCategory()}
                                        >
                                            <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                            Add category
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="overflow-x-auto w-full">
                                <div className="min-w-full align-middle">
                                    <div class="overflow-hidden shadow">
                                        <DataTableExtensions {...tableData}>
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
                                                customStyles={customStyles}
                                                columns={columns}
                                                data={allcategories}
                                            />
                                        </DataTableExtensions>
                                    </div>
                                </div>

                            </div>
                        </div>                     
                        <div className="fixed left-0 right-0 z-50 items-center justify-center hidden overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full" id="delete-user-modal">
                            {/* <DeleteUserModal /> */}
                        </div>

                    </main>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default AdminCategoriesList