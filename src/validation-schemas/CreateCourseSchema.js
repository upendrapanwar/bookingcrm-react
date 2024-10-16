import * as Yup from 'yup';

export default Yup.object().shape({
    course_title: Yup.string()
        .required('Course title is required')
        .min(3, 'Course title must be at least 3 characters long'),

    category: Yup.string()
        .required('Category is required')
        .min(3, 'Category must be at least 3 characters long'),

    course_format: Yup.string()
        .required('Course format is required')
        .min(3, 'Course format must be at least 3 characters long'),

    regular_price: Yup.number()
        .required('Regular price is required')
        .min(0, 'Regular price must be a positive number'),

    sale_price: Yup.number()
        .nullable()
        .min(0, 'Sale price must be a positive number')
        .test('is-less-than', 'Sale price must be less than the regular price', function (value) {
            if (value == null) return true;
            return value < this.parent.regular_price;
        }),

    vat: Yup.number()
        .min(0, 'VAT must be a positive number')
        .max(100, 'VAT must not exceed 100%'),

    availability: Yup.string()
        .required('Availability is required')
        .min(3, 'Availability must be at least 3 characters long')
        .matches(
            /^\d{2}\/\d{2}\/\d{2} To \d{2}\/\d{2}\/\d{2}$/,
            'Availability must be in the format "dd/mm/yy to dd/mm/yy"'
        ),

    enrollment_capacity: Yup.number()
        .min(1, 'Enrollment capacity must be at least 1')
        .required('Enrollment capacity is required'),

    course_information: Yup.string()
        .required('Course information is required')
        .min(10, 'Course information must be at least 10 characters long'),

    additional_information: Yup.string().nullable()
});