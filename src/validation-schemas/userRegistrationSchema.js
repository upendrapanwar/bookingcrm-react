import * as Yup from 'yup';

export default Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Business Email ID is required'),
    password: Yup.string().required('Password is required').min(6, 'Password is too short - should be 6 chars minimum.').max(20, 'Password is too long - should be 20 chars maximum.'),
    password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    // address: Yup.string().required('Complete Address is required'),
    date_of_birth: Yup.date().required('Date of Birth is required'),
    phone_number: Yup.string().required('Contact Number is required'),
    gender: Yup.string().required('Gender is required'),
});