import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Formik } from "formik";
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Cropper from 'react-easy-crop';
import Typography from '@material-ui/core/Typography';
import { getCroppedImg, getRotatedImage } from '../../../../components/common/cropper/CanvasUtils.js';
import { getOrientation } from 'get-orientation/browser';
import Header from "../../../../components/admin/Header";
import Sidebar from '../../../../components/admin/Sidebar';
import Footer from "../../../../components/admin/Footer";
import CreateCategoriesSchema from "../../../../validation-schemas/CreateCategorySchema.js"



// const ORIENTATION_TO_ANGLE = {
//   '3': 180,
//   '6': 90,
//   '8': -90,
// }

const CreateCategories = (classes) => {
  const navigate = useNavigate();
  const authInfo = JSON.parse(localStorage.getItem('authInfo'));
  // const [crop, setCrop] = useState({ x: 0, y: 0 })
  // const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = React.useState(null);
  // const [rotation, setRotation] = useState(0)
  // const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  // const [croppedImage, setCroppedImage] = useState(null)
  // const [initialCrop, setInitialCrop] = useState({ x: 0, y: 0 });
  // const [initialZoom, setInitialZoom] = useState(1);
  const [subCategories, setSubcategories] = useState([]);



  useEffect(() => {
    getAllCate();
  }, []);


  const getAllCate = async () => {
    try {
      const response = await axios.get("/admin/getAllcategories", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${authInfo.token}`
        }
      });

      if (response.data.status === true && response.data.data.length > 0) {
        const cateData = response.data.data;
        console.log("cateData", cateData);
        const categoryList = cateData.map((item) => ({
          id: item.id,
          name: item.category
        }));
        setSubcategories(categoryList);
      };
    } catch (error) {
      toast.dismiss();
      if (error.response) {
        toast.error(error.response.data.message, { autoClose: 3000 });
      }
    }
  };


  const handleChange = (e) => {
    // handleChange(e);
    if (e.target.value === "") {
      e.target.value = null;
    }
  };
  /***********************************************************************/
  /***********************************************************************/
  /**
   * Handle after form submission
   * 
   * 
  */
  const handleSubmit = async (values, { resetForm }) => {
    console.log('values=', values);
    const selectedSubCategory = values.sub_category ? JSON.parse(values.sub_category) : null;
    const formData = {
      ...values,
      sub_category: selectedSubCategory ? selectedSubCategory.id : null,
      sub_category_name: selectedSubCategory ? selectedSubCategory.name : null,
    };
  
    try {
      const res = await axios.post('/admin/add_category', formData, {
        headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${authInfo.token}`
        }
      })

      if (res.data.status === true && res.data.data.length > 0) {
        toast.success(res.data.message);
        resetForm();
        getAllCate();
        setImageSrc(null);
      }

    } catch (error) {
      toast.dismiss();
      if (error.response) {
        resetForm();
        setImageSrc(null);
        toast.error(error.response.data.message, { autoClose: 3000 });
      }
    }
  }

  return (
    <>
      <Header />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
          <main>
            <div className="p-4 bg-white block sm:flex items-center justify-between border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
              <div className="w-full mb-1">
                <div className="mb-4">
                  <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                      <li className="inline-flex items-center">
                        <Link to={"#"} className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                          <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                          Home
                        </Link>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                          <Link to={"/admin/categories/categories-list/"} className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Categories List</Link>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                          <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Add New Category</span>
                        </div>
                      </li>
                    </ol>
                  </nav>
                  <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Add new Category</h1>
                </div>
              </div>
            </div>
            <div className="relative w-full h-full px-4 md:h-auto mt-20">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <div className="p-6 space-y-6 overflow-y-auto">
                  <Formik
                    initialValues={{
                      name: '',
                      sub_category: "",
                      description: '',
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      handleSubmit(values, { resetForm });
                      setSubmitting(false);

                    }}
                    validationSchema={CreateCategoriesSchema}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3 mb-10">
                            <div className="col-span-6 sm:col-span-3 mb-10">
                              {/* Category Name */}
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                placeholder="Enter Category Name"
                                required
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                              />
                              {errors.name && touched.name && (
                                <small className="text-red-500">{errors.name}</small>
                              )}

                              <label htmlFor="sub_category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parent category Name</label>
                              <select
                                name="sub_category"
                                id="sub_category"
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.sub_category || ""}
                              >
                                <option value="">
                                  Choose Parent category
                                </option>
                                {subCategories.map((subCategory) => (
                                  <option key={subCategory.id} value={JSON.stringify({ id: subCategory.id, name: subCategory.name })}>
                                    {subCategory.name}
                                  </option>
                                ))}
                              </select>
                              {errors.sub_category && touched.sub_category && (
                                <small className="text-red-500">{errors.sub_category}</small>
                              )}
                            </div>

                            <div className="col-span-6">
                              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                              <textarea
                                id="description"
                                name="description"
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                                placeholder="Category Description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                              ></textarea>
                              {errors.description && touched.description && (
                                <small className="text-red-500">{errors.description}</small>
                              )}
                            </div>
                            <div className="col-span-6 mt-4">
                              <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? 'Submitting...' : 'Create Category'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </>
  )
}

export default CreateCategories