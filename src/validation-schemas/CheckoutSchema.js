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
    // cardNumber: Yup.string()
    // .matches(/^\d{13,19}$/, 'Card number must be between 13 and 19 digits') 
    // .required('Card number is required'),    expiryDate: Yup.string()
    //     .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration date must be MM/YY')
    //     .required('Expiration date is required'),
    // cvv: Yup.string()
    //     .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
    //     .required('CVV is required')
});