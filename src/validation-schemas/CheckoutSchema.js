import * as Yup from 'yup';

export default Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    companyName: Yup.string(),
    country: Yup.string().required('Country/Region is required'),
    streetAddress: Yup.string().required('Street address is required'),
    flat: Yup.string(),
    city: Yup.string().required('City is required'),
    county: Yup.string(),
    postcode: Yup.string().required('Postcode is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    acknowledge: Yup.boolean().oneOf([true], 'You must acknowledge the terms'),
    cardNumber: Yup.string().required('Card number is required'),
    expiryDate: Yup.string().required('Expiration date is required'),
    cvv: Yup.string().required('CVV is required'),    
});