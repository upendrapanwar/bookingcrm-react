import React from "react";

const EditUser = () => {
    return (
        
            <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                        <h3 className="text-xl font-semibold dark:text-white">
                            Edit user
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-toggle="edit-user-modal">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                        </button>
                    </div>
                                   
                    <div className="p-6 space-y-6">
                        <form action="#">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <input type="text" name="first-name" value="Bonnie" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bonnie" required />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input type="text" name="last-name" value="Green" id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Green" required />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" value="bonnie@flowbite.com" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example@company.com" required />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                    <input type="text" name="position" value="React Developer" id="position" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. React developer" required />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                                    <input type="password" name="current-password" value="••••••••" id="current-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                                    <input type="password" name="new-password" value="••••••••" id="new-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" required />
                                </div>
                                <div className="col-span-6">
                                    <label htmlFor="biography" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Biography</label>
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
    
    );
}

export default EditUser;