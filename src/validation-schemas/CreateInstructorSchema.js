import * as Yup from 'yup';

export default Yup.object().shape({
    first_name: Yup.string()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters long'),

    last_name: Yup.string()
        .required('Last name is required')
        .min(3, 'Last name must be at least 3 characters long'),
    
    contact_no: Yup.number()
        .required('Contact number is required')
        .min(10, 'Contact number must be at least 10 digits long'),

    email: Yup.string()
        .required('Email is required')
        .email('Invalid email address'),

    instructor_image: Yup.string().nullable(),

    // instructor_unavailable_dates: Yup.array().nullable(),

});