import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import { toast } from 'react-toastify';
import axios from "axios";
import UserAdminRegisterSchema from '../../../validation-schemas/UserAdminRegisterSchema';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { getCroppedImg, getRotatedImage } from '../../../components/common/cropper/CanvasUtils.js';
import { styles } from '../../../components/common/cropper/Styles.js';
//import ImgDialog from '../../../components/common/cropper/ImgDialog.js';
import { getOrientation } from 'get-orientation/browser';
import Header from "../../../components/admin/Header";
import Sidebar from '../../../components/admin/Sidebar';
import Footer from "../../../components/admin/Footer";


const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
}

const AddUser = ({ updateParentAddModalState, closeModal, classes }) => {
  const navigate = useNavigate();
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = React.useState(null);
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [initialCrop, setInitialCrop] = useState({ x: 0, y: 0 });
  const [initialZoom, setInitialZoom] = useState(1);

  useEffect(() => {

  }, []);
  /***********************************************************************/
  /***********************************************************************/
  /**
   * Update Add User modal state
   * 
   * @param state
   * 
  */
  const handleSubmit = (values, { resetForm }) => {
    alert('called');
    console.log('values=' + values);

  }
  /***********************************************************************/
  /***********************************************************************/
  /**
   * On crop complete
   * 
   * @param (objj,obj)
   * 
   */
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }
  /***********************************************************************/
  /***********************************************************************/
  /***
   * Show cropped image
   * 
   */
  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }
  /***********************************************************************/
  /***********************************************************************/
  /**
   *Reset cropped image
   *
   */
  const onClose = () => {
    setCroppedImage(null)
  }
  /***********************************************************************/
  /***********************************************************************/
  /**
   *On chanage file upload
   *
   * @param {*} e
   */
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      try {
        // apply rotation if needed
        const orientation = await getOrientation(file)
        const rotation = ORIENTATION_TO_ANGLE[orientation]
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
        }
      } catch (e) {
        console.warn('failed to detect the orientation')
      }

      setImageSrc(imageDataUrl)
    }
  }
  /***********************************************************************/
  /***********************************************************************/
  /**
   * Readfile on file load
   * 
   * @param {*} file 
   * @returns 
   */
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }
  /***********************************************************************/
  /***********************************************************************/
  // Reset crop and zoom to initial values
  const handleReset = () => {
    setCrop(initialCrop);
    setZoom(initialZoom);
    setImageSrc(null);
  };
  /***********************************************************************/
  /***********************************************************************/
  return (
    <>
      <Header />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div id="main-content" className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900 admin-main-container">
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
                          <Link to={"/admin/users/user-list"} className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">User List</Link>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                          <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page">Add New User</span>
                        </div>
                      </li>
                    </ol>
                  </nav>
                  <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Add new user</h1>
                </div>
              </div>
            </div>
            <div className="relative w-full h-full px-4 md:h-auto mt-20">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                <div className="p-6 space-y-6 overflow-y-auto">
                  <Formik
                    initialValues={{
                      firstName: '',
                      lastName: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                      phone: ''
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      console.log('Form Submitted!', values);

                      setSubmitting(false);
                      handleSubmit(values, { resetForm });
                    }}
                    validationSchema={UserAdminRegisterSchema}
                  >
                    {({ values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isValid,
                      isSubmitting
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3 mb-10">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>

                            <div>
                              {imageSrc ? (
                                <React.Fragment>
                                  <div className={classes.cropContainer}>
                                    <Cropper
                                      image={imageSrc}
                                      crop={crop}
                                      rotation={rotation}
                                      zoom={zoom}
                                      aspect={4 / 3}
                                      onCropChange={setCrop}
                                      onRotationChange={setRotation}
                                      onCropComplete={onCropComplete}
                                      onZoomChange={setZoom}
                                    />
                                  </div>
                                  <div className={classes.controls}>
                                    <div className={classes.sliderContainer}>
                                      <Typography
                                        variant="overline"
                                        classes={{ root: classes.sliderLabel }}
                                      >
                                        Zoom
                                      </Typography>
                                      <Slider
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        classes={{ root: classes.slider }}
                                        onChange={(e, zoom) => setZoom(zoom)}
                                      />
                                    </div>
                                    <div className={classes.sliderContainer}>
                                      <Typography
                                        variant="overline"
                                        classes={{ root: classes.sliderLabel }}
                                      >
                                        Rotation
                                      </Typography>
                                      <Slider
                                        value={rotation}
                                        min={0}
                                        max={360}
                                        step={1}
                                        aria-labelledby="Rotation"
                                        classes={{ root: classes.slider }}
                                        onChange={(e, rotation) => setRotation(rotation)}
                                      />
                                    </div>
                                    <button className="MuiButtonBase-root MuiButton-root AddUser-cropButton-55 MuiButton-contained MuiButton-containedPrimary" onClick={handleReset}>Reset</button>
                                    <Button
                                      onClick={showCroppedImage}
                                      variant="contained"
                                      color="primary"
                                      classes={{ root: classes.cropButton }}
                                    >
                                      Show Result
                                    </Button>
                                  </div>
                                  <img className="h-auto max-w-xs rounded-lg mb-20" src={croppedImage} alt="croppedImage" />
                                  {/*<ImgDialog img={croppedImage} onClose={onClose} />*/}
                                </React.Fragment>
                              ) : (
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="profile_image_url" name="profile_image_url" type="file" onChange={onFileChange} accept="image/*" />
                              )}
                            </div>

                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input type="text" name="firstName" id="firstName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter First Name" required onChange={handleChange} onBlur={handleBlur} value={values.firstName} />
                            {errors.firstName && (touched.firstName || !isValid.firstName) ? (
                              <small className="text-danger">{errors.firstName}</small>
                            ) : null}

                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input type="text" name="lastName" id="lastName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Last Name" required onChange={handleChange} onBlur={handleBlur} value={values.lastName} />
                            {(touched.lastName || !isValid.lastName) && errors.lastName ? (
                              <small className="text-danger">{errors.lastName}</small>
                            ) : null}
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Email" required onChange={handleChange} onBlur={handleBlur} value={values.email} />
                            {(touched.email || !isValid.email) && errors.email ? (
                              <small className="text-danger">{errors.email}</small>
                            ) : null}
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Password" required onChange={handleChange} onBlur={handleBlur} value={values.password} />
                            {(touched.password || !isValid.password) && errors.password ? (
                              <small className="text-danger">{errors.password}</small>
                            ) : null}
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Password Again" required onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} />
                            {(touched.confirmPassword || !isValid.confirmPassword) && errors.confirmPassword ? (
                              <small className="text-danger">{errors.confirmPassword}</small>
                            ) : null}
                          </div>
                          <div className="col-span-6">
                            <label htmlFor="biography" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Role</label>
                            <select className="form-control" name="role" id="exampleFormControlSelect1" onChange={handleChange} onBlur={handleBlur} value={values.role} >
                              <option value="">Select User Type</option>
                              <option value="student">Student</option>
                              <option value="instructor">Instructor</option>
                              <option value="manager">Manager</option>
                            </select>
                            {(touched.role || !isValid.role) && errors.role ? (
                              <small className="text-danger">{errors.role}</small>
                            ) : null}
                          </div>
                          <div className="col-span-6">
                            <label htmlFor="biography" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Gender</label>
                            <select className="form-control" name="gender" id="exampleFormControlSelect1" onChange={handleChange} onBlur={handleBlur} value={values.gender} >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                            {(touched.gender || !isValid.gender) && errors.gender ? (
                              <small className="text-danger">{errors.gender}</small>
                            ) : null}
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                            <input type="text" name="phone" id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Phone" required onChange={handleChange} onBlur={handleBlur} value={values.phone} />
                            {(touched.phone || !isValid.phone) && errors.phone ? (
                              <small className="text-danger">{errors.phone}</small>
                            ) : null}
                          </div>
                          <div className="col-span-6">
                            <label htmlFor="biography" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                            <textarea id="address" name="address" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Full-stack web developer. Open-source contributor." onChange={handleChange} onBlur={handleBlur} value={values.address}></textarea>
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                            <input type="text" name="city" id="city" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="City" onChange={handleChange} onBlur={handleBlur} value={values.city} />

                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                            <input type="text" name="state" id="state" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="State" onChange={handleChange} onBlur={handleBlur} value={values.state} />

                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zip</label>
                            <input type="text" name="zip" id="zip" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Zip" onChange={handleChange} onBlur={handleBlur} value={values.zip} />

                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <select className="form-control" name="country" id="exampleFormControlSelect1" onChange={handleChange} onBlur={handleBlur} value={values.country} >
                              <option value="">Select Country</option>
                              <option value="IN">India</option>
                              <option value="UK">United Kingdom</option>
                              <option value="USA">USA</option>

                            </select>

                          </div>

                        </div>

                        <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                          <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">Add user</button>
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
  );
}

export default withStyles(styles)(AddUser);