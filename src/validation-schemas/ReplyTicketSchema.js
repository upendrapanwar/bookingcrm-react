import * as Yup from 'yup';

export default Yup.object({
    message: Yup.string().required("Message is required"),
    status: Yup.string().required("Status is required"),
});