import * as Yup from 'yup';


export default Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string(),
    subject: Yup.string().required("Subject name is required"),
    message: Yup.string().required("Message is required"),
});