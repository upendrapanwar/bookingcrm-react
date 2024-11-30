import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import $ from 'jquery';
import './App.css';
//import './index.css';
import './output.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/assets/css/default.css';
import '../src/assets/css/style.css';
import '../src/assets/css/responsive.css';
import '../src/assets/css/slick.css';
import 'font-awesome/css/font-awesome.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../src/assets/css/admin-main.css';


// import './assets/fonts/font';
import Loader from './components/common/Loader';
import CreateCategories from './containers/admin/courses/categories/AddCategories';
import AdminCategoriesList from './containers/admin/courses/categories/AdminCategoriesList';
import EditCategories from './containers/admin/courses/categories/EditCategories';
import Cart from './components/common/cart/Cart';
import Checkout from './components/common/Checkout';
import CourseDeliveryOptions from './components/common/CourseDeliveryOptions';
import Order from './components/common/Order';
import CheckoutForm from './components/common/CheckoutForm';
import CompletePage from './components/common/CompletePage';
import PaymentDone from './components/common/PaymentDone';



const Home = lazy(() => import('./containers/Home'));
const Register = lazy(() => import('./containers/Register'));
const Login = lazy(() => import('./containers/Login'));
const StudentDashboard = lazy(() => import('./containers/student/StudentDashboard'));
const InstructorDashboard = lazy(() => import('./containers/instructor/InstructorDashboard'));
const ManagerDashboard = lazy(() => import('./containers/manager/ManagerDashboard'));

const AdminLogin = lazy(() => import('./containers/admin/Login'));
const AdminDashboard = lazy(() => import('./containers/admin/AdminDashboard'));
const CreateCourse = lazy(() => import('./containers/admin/courses/AddCourses'));
const UserList = lazy(() => import('./containers/admin/users/UserList'));
const AddUser = lazy(() => import('./containers/admin/users/AddUser'));

const CourseListing = lazy(() => import('./components/common/courses/ListingCourses'));
const EditCourse = lazy(() => import('./containers/admin/courses/EditCourses'));
const CourseDetails = lazy(() => import('./components/common/courses/CourseDetails'));
const AdminCoursesList = lazy(() => import('./containers/admin/courses/AdminCoursesList'));
const AboutUs = lazy(() => import('./components/common/AboutUs'));
const ContactUs = lazy(() => import('./components/common/ContactUs'));
const AdminInstructorsList = lazy(() => import('./containers/admin/instructors/AdminInstructorsList'));
const CreateInstructor = lazy(() => import('./containers/admin/instructors/CreateInstructor'));
const EditInstructor = lazy(() => import('./containers/admin/instructors/EditInstructor'))
const InstructorMoreInformation = lazy(()=> import('./containers/admin/instructors/InstructorMoreInformation'))

function App() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/*" element={
          <Suspense fallback={<Loader />}>
            <PublicRoutes />

          </Suspense>
        }
        />

        <Route path="/admin/*" element={
          <Suspense fallback={<Loader />}>
            <AdminRoutes />
          </Suspense>
        }
        />
      </Routes>

    </>
  );

}

export default App;

export const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='/student/student-dashboard' element={<StudentDashboard />} />
        <Route path='/instructor' element={<InstructorDashboard />} />
        <Route path='/manager/manager-dashboard' element={<ManagerDashboard />} />
        <Route path='/course-listing' element={<CourseListing />} />
        <Route path='/course-listing/course-details' element={<CourseDetails />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/course-delivery-option' element={<CourseDeliveryOptions />} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/payment-done' element={<PaymentDone/>} />
        {/* <Route path='/complete' element={<CompletePage/>} /> */}
        {/* <Route path='/checkout-form' element={<CheckoutForm/>} /> */}

        
        <Route path='/order-done' element={<Order/>} />
        <Route index element={<Home />} />
      </Routes>
    </>
  )
}

// export const PrivateRoutes = () => {
//   return (
//     <>
//       <Routes>

//       </Routes>
//     </>
//   ) 
// }

export const PrivateRoute = ({ children }) => {

  const isAuthenticated = () => {
    const authInfo = localStorage.getItem("authInfo");

    if (authInfo) {
      const { token, role } = JSON.parse(authInfo);

      return token && role === "admin";
    }

    return false;
  };


  return isAuthenticated() ? children : <Navigate to="/admin/login" />;
};


export const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='login' element={<AdminLogin />} />
        <Route path='admin-dashboard' element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path='admin-CreateCourse' element={
          <PrivateRoute>
            <CreateCourse />
          </PrivateRoute>
        } />
        <Route path='users/user-list' element={
          <PrivateRoute>
            <UserList />
          </PrivateRoute>
        } />
        <Route path='users/add-user' element={
          <PrivateRoute>
            <AddUser />
          </PrivateRoute>
        } />
        <Route path='admin-EditCourse' element={
          <PrivateRoute>
            <EditCourse />
          </PrivateRoute>
        } />
        <Route path='courses/courses-list' element={
          <PrivateRoute>
            <AdminCoursesList />
          </PrivateRoute>
        } />
        <Route path='admin-CreateCategories' element={
          <PrivateRoute>
            <CreateCategories />
          </PrivateRoute>
        } />
        <Route path='categories/categories-list' element={
          <PrivateRoute>
            <AdminCategoriesList />
          </PrivateRoute>
        } />
        <Route path='admin-EditCategory' element={
          <PrivateRoute>
            <EditCategories />
          </PrivateRoute>
        } />
        <Route path='instructors/instructors-list/' element={
          <PrivateRoute>
            <AdminInstructorsList />
          </PrivateRoute>
        } />
        <Route path='admin-CreateInstructor' element={
          <PrivateRoute>
            <CreateInstructor />
          </PrivateRoute>
        } />
        <Route path='admin-EditInstructor' element={
          <PrivateRoute>
            <EditInstructor />
          </PrivateRoute>
        } />
         <Route path='admin-Instructor-MoreInformation' element={
          <PrivateRoute>
            <InstructorMoreInformation />
          </PrivateRoute>
        } />
      </Routes>
    </>
  );
}
