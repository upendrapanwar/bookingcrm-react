import * as Yup from 'yup';

export default Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Business Email ID is required'),
    password: Yup.string().required('Password is required').min(6, 'Password is too short - should be 6 chars minimum.').max(20, 'Password is too long - should be 20 chars maximum.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    phone: Yup.string().required('Phone is required'),
    role: Yup.string().required('Role is required'),
    gender: Yup.string().required('Gender is required'),
    // address: Yup.string().required('Complete Address is required'),
});