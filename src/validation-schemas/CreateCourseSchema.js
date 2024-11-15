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

    // availability: Yup.string()
    //     .required('Availability is required')
    //     .min(3, 'Availability must be at least 3 characters long')
    //     .matches(
    //         /^\d{2}\/\d{2}\/\d{2} To \d{2}\/\d{2}\/\d{2}$/,
    //         'Availability must be in the format "dd/mm/yy to dd/mm/yy"'
    //     ),

    // start_date: Yup.date()
    //     .required('Start date is required')
    //     .typeError('Invalid start date'),

    // end_date: Yup.date()
    //     .required('End date is required')
    //     .typeError('Invalid end date')
    //     .min(Yup.ref('start_date'), 'End date must be after start date'),

    // courseScheduleDates: Yup.array()
    // .of(
    //     Yup.string()
    //         .matches(
    //             /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.000\+0000)$/,
    //             "Invalid date format. Please use a valid ISO date"
    //         )
    //         .required("Each date is required")
    // )
    // // .min(1, "At least one course schedule date is required")
    // .required("Course schedule dates are required"),

    // course_time: Yup.string()
    //     .required('Time is required')
    //     .min(3, 'Time must be at least 3 characters long')
    //     .matches(
    //         /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM) - (0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
    //         'Time must be in the format "HH:MM AM - HH:MM PM"'
    //     ),
    course_time: Yup.array()
        .min(1, 'At least one time range is required')
        .required('Course time is required'),


    enrollment_capacity: Yup.number()
        .min(1, 'Enrollment capacity must be at least 1')
        .required('Enrollment capacity is required'),

    course_information: Yup.string()
        .nullable(),
    // .required('Course information is required'),
    //.min(10, 'Course information must be at least 10 characters long'),

    additional_information: Yup.string().nullable(),
    completing_the_course: Yup.string().nullable(),

    course_image: Yup.string().nullable(),
});