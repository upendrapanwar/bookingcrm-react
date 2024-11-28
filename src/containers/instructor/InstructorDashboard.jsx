// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Header from '../../components/common/Header';
// import Footer from '../../components/common/Footer';

// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';  // For date click interaction
// import axios from 'axios';
// // import '@fullcalendar/daygrid/index.css';
// //import '@fullcalendar/core/main.min.css';
// // import '@fullcalendar/daygrid/main.css'; 
// // import '@fullcalendar/interaction/main.css'; 

// const InstructorDashboard = () => {
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);

//     const instructorId = queryParams.get('id');
//     const instructorName = queryParams.get('name');

//     const [storedInstructorData, setStoredInstructorData] = useState({
//         instructorId: '',
//         instructorName: '',
//     });

//     const [selectedDates, setSelectedDates] = useState([]);
//     console.log('selectedDate', selectedDates)

//     useEffect(() => {
//         // If URL parameters are present, store them in localStorage
//         if (instructorId && instructorName) {
//             const instructorData = { instructorId, instructorName };
//             localStorage.setItem('instructorData', JSON.stringify(instructorData));
//             // setStoredInstructorData(instructorData);

//             const storedData = localStorage.getItem('instructorData');
//             if (storedData) {
//                 setStoredInstructorData(JSON.parse(storedData));
//             }
//         }
//     }, [instructorId, instructorName]);




//     const handleDateClick = (info) => {
//         const dateStr = info.dateStr;
//         setSelectedDates((prevDates) => {
//             // Ensure prevDates is an array
//             if (!Array.isArray(prevDates)) return [];
//             return prevDates.includes(dateStr)
//                 ? prevDates.filter((date) => date !== dateStr) // Deselect if already selected
//                 : [...prevDates, dateStr]; // Add new selected date
//         });
//     };

//     // Custom rendering of day cell content to add a 'selected' class
//     const dayCellDidMount = (info) => {
//         if (selectedDates.includes(info.dateStr)) {
//           const dayCell = info.el; // This is the actual DOM element for the day cell
//           dayCell.classList.add('selected-date');
//         }
//       };

//     return (
//         <>
//             <Header />
//             <section className="main_container pt-70 pb-25">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-12">
//                             <h1>Hi, {storedInstructorData.instructorName || ''}!</h1>
                           
//                             <div className="bg-white rounded-lg shadow p-6">
                                
//                                 <FullCalendar
//                                     plugins={[dayGridPlugin, interactionPlugin]}
//                                     initialView="dayGridMonth"
//                                     dateClick={handleDateClick}
//                                     height="auto"
//                                     contentHeight="auto"
//                                     aspectRatio={1.5}
//                                     dayCellClassNames={dayCellDidMount}
//                                     headerToolbar={{
//                                         left: '',
//                                         center: 'title',
//                                         right: 'prev,next today'
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <Footer />
//         </>
//     );
// };

// export default InstructorDashboard;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // For date click interaction

const InstructorDashboard = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const instructorId = queryParams.get('id');
    const instructorName = queryParams.get('name');

    const [storedInstructorData, setStoredInstructorData] = useState({
        instructorId: '',
        instructorName: '',
    });

    const [selectedDates, setSelectedDates] = useState([]);
    console.log('selectedDate', selectedDates);

    useEffect(() => {
        if (instructorId && instructorName) {
            const instructorData = { instructorId, instructorName };
            localStorage.setItem('instructorData', JSON.stringify(instructorData));

            const storedData = localStorage.getItem('instructorData');
            if (storedData) {
                setStoredInstructorData(JSON.parse(storedData));
            }
        }
    }, [instructorId, instructorName]);

    const handleDateClick = (info) => {
        const dateStr = info.dateStr;
        setSelectedDates((prevDates) =>
            prevDates.includes(dateStr)
                ? prevDates.filter((date) => date !== dateStr) // Deselect if already selected
                : [...prevDates, dateStr] // Add new selected date
        );
    };

    const dayCellContent = (info) => {
        // Check if the date is in selectedDates
        const isSelected = selectedDates.includes(info.dateStr);

        // Apply inline styles conditionally
        const style = isSelected
            ? {
                  backgroundColor: '#f0a500',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'inline-block',
                  padding: '5px',
                  width: '100%',
                  textAlign: 'center',
              }
            : {};

        return (
            <div style={style}>
                {info.dayNumberText} {/* Day number text */}
            </div>
        );
    };

    return (
        <>
            <Header />
            <section className="main_container pt-70 pb-25">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Hi, {storedInstructorData.instructorName || ''}!</h1>
                            <div className="bg-white rounded-lg shadow p-6">
                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    dateClick={handleDateClick}
                                    height="auto"
                                    contentHeight="auto"
                                    aspectRatio={1.5}
                                    dayCellContent={dayCellContent}
                                    headerToolbar={{
                                        left: '',
                                        center: 'title',
                                        right: 'prev,next today',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default InstructorDashboard;
