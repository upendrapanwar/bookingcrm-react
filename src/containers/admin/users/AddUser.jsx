import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
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
import ImgDialog from '../../../components/common/cropper/ImgDialog.js';
import { getOrientation } from 'get-orientation/browser'


const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
}

const AddUser = ({ updateParentAddModalState, closeModal, classes }) => {
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
        console.log();
    
    }
    /***********************************************************************/
    /***********************************************************************/
     /**
     * Update Add User modal state
     * 
     * @param state
     * 
    */
    const handleCloseAddUserModal = () => {
        updateParentAddModalState(false);
        closeModal(false);
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
            <div className="relative w-full h-full max-w-2xl px-4 md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                        <h3 className="text-xl font-semibold dark:text-white">
                            Add new user
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-toggle="add-user-modal" onClick={() => handleCloseAddUserModal(false)}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                        </button>
                    </div>
                                        
                    <div className="p-6 space-y-6 containClass overflow-y-auto">
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''

                            }}
                            onSubmit={(values, { resetForm }) => {
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
                                    <form action="#" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
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
                                                      <button onClick={handleReset}>Reset</button>
                                                      <Button
                                                        onClick={showCroppedImage}
                                                        variant="contained"
                                                        color="primary"
                                                        classes={{ root: classes.cropButton }}
                                                      >
                                                        Show Result
                                                      </Button>
                                                    </div>
                                                    <img src={croppedImage} alt="croppedImage" />
                                                    {/*<ImgDialog img={croppedImage} onClose={onClose} />*/}
                                                  </React.Fragment>
                                                ) : (
                                                  <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="profile_image_url" name="profile_image_url" type="file" onChange={onFileChange} accept="image/*" />
                                                )}
                                              </div>
                                                
                                            </div>  


                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                                <input type="text" name="firstName" id="firstName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bonnie" required onChange={handleChange} onBlur={handleBlur} value={values.firstName}/>
                                                {touched.firstName && errors.firstName ? (
                                                    <small className="text-danger">{errors.firstName}</small>
                                                ) : null}
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                                <input type="text" name="lastName" id="lastName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Green" required onChange={handleChange} onBlur={handleBlur} value={values.lastName}/>
                                                {touched.lastName && errors.lastName ? (
                                                    <small className="text-danger">{errors.lastName}</small>
                                                ) : null}
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="example@company.com" required onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                                                {touched.email && errors.email ? (
                                                    <small className="text-danger">{errors.email}</small>
                                                ) : null}
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                <input type="password" name="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. React developer" required onChange={handleChange} onBlur={handleBlur} value={values.password} />
                                                {touched.password && errors.password ? (
                                                    <small className="text-danger">{errors.password}</small>
                                                ) : null}
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                                <input type="password" name="confirmPassword" id="confirmPassword" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="e.g. React developer" required onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} />
                                                {touched.confirmPassword && errors.confirmPassword ? (
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
                                                {touched.role && errors.role ? (
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
                                                {touched.gender && errors.gender ? (
                                                    <small className="text-danger">{errors.gender}</small>
                                                ) : null}
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                                <input type="text" name="phone" id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Green" required onChange={handleChange} onBlur={handleBlur} value={values.phone}/>
                                                {touched.phone && errors.phone ? (
                                                    <small className="text-danger">{errors.phone}</small>
                                                ) : null}
                                            </div>
                                            <div className="col-span-6">
                                                <label htmlFor="biography" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                                <textarea id="address" name="address" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Full-stack web developer. Open-source contributor."> Full-stack web developer. Open-source contributor.</textarea>
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

            <div className="fixed left-0 right-0 z-50 items-center justify-center hidden overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full" id="delete-user-modal">
                <div className="relative w-full h-full max-w-md px-4 md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                                           
                        <div className="flex justify-end p-2">
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-hide="delete-user-modal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                            </button>
                        </div>
                                            
                        <div className="p-6 pt-0 text-center">
                            <svg className="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
                            <Link to={"#"} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                                Yes, I'm sure
                            </Link>
                            <Link to={"#"} className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700" data-modal-hide="delete-user-modal">
                                No, cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>    
    );
}

export default withStyles(styles)(AddUser);