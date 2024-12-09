import * as Yup from 'yup';

export default Yup.object({
    tfirstName: Yup.string().required("First name is required"),
    tlastName: Yup.string().required("Last name is required"),
    temail: Yup.string().email("Invalid email address").required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    tmessage: Yup.string().required("Message is required"),
});