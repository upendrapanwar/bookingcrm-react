import * as Yup from 'yup';

export default Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Business Email ID is required'),
    password: Yup.string().required('Password is required').min(6, 'Password is too short - should be 6 chars minimum.').max(20, 'Password is too long - should be 20 chars maximum.'),
});