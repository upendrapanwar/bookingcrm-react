import React from 'react';
import { useLocation } from "react-router-dom";

import CourseListing from '../components/common/courses/ListingCourses';

const Home = () => {

    const location = useLocation();
    const passedData = location.state?.isSearch || false ;

    return (
        <>
        <CourseListing passedData={passedData}/>
        </>
    );
}

export default Home;