import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const InstructorDashboard = () => {
    // Extract query parameters from the URL
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const instructorId = queryParams.get('id'); 

    // useEffect(() => {
    //     console.log('queryParams',queryParams)
    //     if (instructorId) {
    //         localStorage.setItem('instructorId', instructorId);
    //     }
    // }, [instructorId]);

    const { instructor } = useParams();

    useEffect(() => {
        if (instructor) {
            // Store the instructorId in localStorage
            localStorage.setItem('instructorId', instructor);
        }
    }, [instructor]);

    const storedInstructorData = localStorage.getItem('instructorId');
console.log('storedInstructorId--',storedInstructorData)
    return (
        <>
            <Header />
            <section className="main_container pt-70 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Hi {storedInstructorData.first_name} </h1>
                            <p>Instructor ID from URL: {instructor}</p>
                            <p>Instructor ID from localStorage: {storedInstructorData}</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default InstructorDashboard;
