import * as Yup from 'yup';

export default Yup.object().shape({
    course_title: Yup.string()
        .required('Course title is required')
        .min(3, 'Course title must be at least 3 characters long'),

    category: Yup.string()
        .required('Category is required')
        .min(3, 'Category must be at least 3 characters long'),

    course_type: Yup.string()
        .required('Course type is required'),

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
        .transform(value => (value === null || value === '' ? 0 : value))
        .min(0, 'VAT must be a positive number')
        .max(100, 'VAT must not exceed 100%')
        .default(0),

    courseScheduleDates: Yup.array()
        .min(1, "At least one course schedule date is required")
        .required("Course schedule dates are required"),

    course_time: Yup.array()
        .min(1, 'At least one time range is required')
        .required('Course time is required'),


    enrollment_capacity: Yup.number()
    .min(6, 'Enrollment capacity must be at least 6')
    .max(12, 'Enrollment capacity cannot exceed 12')
        .required('Enrollment capacity is required'),

    course_information: Yup.string()
        .required('Course information is required')
        .min(10, 'Course information must be at least 10 characters'),

    additional_information: Yup.string().nullable(),
    completing_the_course: Yup.string().nullable(),
    why_use_our_training: Yup.string().nullable(),

    course_image: Yup.string().nullable(),
});