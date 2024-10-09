import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const InstructorDashboard = () => {
    return(
        <>
            <Header/>
            <section className="main_container pt-70 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Instructor Dashboard</h1>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>            
    );
}

export default InstructorDashboard;