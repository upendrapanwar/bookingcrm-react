import * as Yup from 'yup';

export default Yup.object().shape({
    name: Yup.string()
    .required('Category Name is required')
    .min(3, 'Category Name must be at least 3 characters')
    .max(50, 'Category Name cannot exceed 50 characters'),
  
  sub_category: Yup.string()
    .required('Parent Category is required')
    .nullable(),

  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description cannot exceed 200 characters'),
    
});