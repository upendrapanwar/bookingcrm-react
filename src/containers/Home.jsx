import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
// import Loader from "../components/common/Loader";
// import Header from '../components/common/Header';
// import Footer from '../components/common/Footer';
// import citbConstructionLogo from '../assets/images/citb-SSSTS-construction-logo-300x300.png';
// import bannerBg from '../assets/images/page-banner-bg.jpg'
// import EmptyImage from "../assets/images/EmptyImage.png";
import { useDispatch } from "react-redux";
import { addToCart } from '../store/reducers/cart-reducer';
import CourseListing from '../components/common/courses/ListingCourses';


const Home = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    //console.log('authINFO',authInfo)
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState([false]);

    useEffect(() => {
        // getCourses();
    }, []);
    /***********************************************************************/
    /***********************************************************************/

    /**
     * Handle to get courses
     * 
     */
    const getCourses = () => {
        setLoading(true);
        axios
            .get("user/get-all-courses")
            .then((response) => {
                toast.dismiss();
                if (response.data.status) {
                    console.log('Courses-----', response)
                    setCourses(response.data.data);
                    // setLoading(false);
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
     * Handle to AddToCart 
     * 
     */
    const handleAddToCart = async (course) => {
        const cart = course;
        console.log("add to cart- cart:", cart);
        dispatch(addToCart(cart));
        toast.success(`${cart.course_title} added to cart!`);
    }
    /***********************************************************************/
    /***********************************************************************/

    /** 
     * Handle More info
     * 
     */
    const handleMoreInfoClick = (course) => {
        console.log('-------', course)
        //setSelectedCourse(course);
        navigate("/course-listing/course-details", { state: { course } });
    };
    /***********************************************************************/
    /***********************************************************************/






    return (
           <>
        <CourseListing />
        </>
    );
}

export default Home;