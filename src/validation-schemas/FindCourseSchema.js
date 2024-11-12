import * as Yup from 'yup';

export default Yup.object().shape({
    month: Yup.string().required("Month is required"),
    type: Yup.string().required("Type is required"),
  });