// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
// import axios from "axios";
// import Loader from "../components/common/Loader";
// import { useLocation } from 'react-router-dom';

// const CourseDetails = () => {
//     const location = useLocation();
//     const { course } = location.state || {};

//     if (!course) {
//         return <p>No course details available!</p>;
//     }
//     console.log('course-----',course)
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState([false]);
//     const [isOpen, setIsOpen] = useState({ courseInfo: false, additionalInfo: false, reviews: false });

//     const toggleSection = (section) => {
//         setIsOpen((prevState) => ({
//             ...prevState,
//             [section]: !prevState[section]
//         }));
//     };

//     return (
//         <>
//         {loading === true ? <Loader /> : ''}
//         <div className="container mx-auto p-6">
//         {/* Main Content */}
//         <div className="flex flex-col md:flex-row justify-between">
//             {/* Image Section */}
//             <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
//                 <img
//                     src="/path-to-your-image.jpg"
//                     alt="Course Logo"
//                     className="w-72 h-72 object-contain"
//                 />
//             </div>

//             {/* Details Section */}
//             <div className="md:w-1/2">
//                 <h1 className="text-2xl font-bold text-gray-800 mb-2">SSSTS | 29-06-2024 | Online</h1>
//                 <p className="text-xl text-purple-600 mb-4">£200.00 + VAT</p>

//                 <p className="mb-2">Day 1 - 29-06-24</p>
//                 <p className="mb-4">Day 2 - 30-06-24</p>

//                 <p className="text-sm text-gray-500 mb-2">8 in stock</p>

//                 {/* Add to Cart Button */}
//                 <div className="mb-4">
//                     <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500">
//                         Add to Cart
//                     </button>
//                 </div>

//                 {/* PayPal Button */}
//                 <div className="mb-4">
//                     <button className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-md">
//                         PayPal
//                     </button>
//                 </div>
//             </div>
//         </div>

//         <div className="mt-6 space-y-4">
//             <div className="border">
//                 <button
//                     className="w-full text-left text-lg font-bold p-4 bg-gray-100"
//                     onClick={() => toggleSection('courseInfo')}
//                 >
//                     Course Information
//                 </button>
//                 {isOpen.courseInfo && <div className="p-4">Details about the course...</div>}
//             </div>

//             <div className="border">
//                 <button
//                     className="w-full text-left text-lg font-bold p-4 bg-gray-100"
//                     onClick={() => toggleSection('additionalInfo')}
//                 >
//                     Additional Information
//                 </button>
//                 {isOpen.additionalInfo && <div className="p-4">Additional information here...</div>}
//             </div>

//             <div className="border">
//                 <button
//                     className="w-full text-left text-lg font-bold p-4 bg-gray-100"
//                     onClick={() => toggleSection('reviews')}
//                 >
//                     Reviews (0)
//                 </button>
//                 {isOpen.reviews && <div className="p-4">No reviews yet.</div>}
//             </div>
//         </div>
//     </div>
//     </>
//     );
// };

// export default CourseDetails;