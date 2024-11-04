import React,{Suspense,lazy} from 'react'
import { Routes, Route } from 'react-router-dom';
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

// import './assets/fonts/font';
import Loader from './components/common/Loader';
import CreateCategories from './containers/admin/courses/categories/AddCategories';
import AdminCategoriesList from './containers/admin/courses/categories/AdminCategoriesList';
import EditCategories from './containers/admin/courses/categories/EditCategories';



const Home = lazy(() => import('./containers/Home'));
const Register = lazy(() => import('./containers/Register'));
const Login = lazy(() => import('./containers/Login'));
const StudentDashboard = lazy(() => import('./containers/student/StudentDashboard'));
const InstructorDashboard = lazy(() => import('./containers/instructor/InstructorDashboard'));
const ManagerDashboard = lazy(() => import('./containers/manager/ManagerDashboard'));

const AdminLogin = lazy(() => import('./containers/admin/Login'));
const AdminDashboard = lazy(() => import('./containers/admin/AdminDashboard'));
const CreateCourse = lazy(() => import('./containers/admin/courses/AddCourses'));
const UserList = lazy(()=> import('./containers/admin/users/UserList'));
const AddUser = lazy(()=> import('./containers/admin/users/AddUser'));

const CourseListing = lazy(() => import('./components/common/courses/ListingCourses'));
const EditCourse = lazy(()=> import('./containers/admin/courses/EditCourses'));
const CourseDetails = lazy(()=> import('./components/common/courses/CourseDetails'));
const AdminCoursesList = lazy(()=> import('./containers/admin/courses/AdminCoursesList'));
const AboutUs = lazy(()=> import('./components/common/AboutUs'));
const ContactUs = lazy(()=> import('./components/common/ContactUs'));

function App() {
    
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />

    <Routes>
      <Route path="/*" element={
        <Suspense fallback={<Loader/>}>
          <PublicRoutes />
          
        </Suspense>
        } 
      />

      <Route path="/admin/*" element={
          <Suspense fallback={<Loader/>}>
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
        <Route path='/instructor/instructor-dashboard' element={<InstructorDashboard />} />
        <Route path='/manager/manager-dashboard' element={<ManagerDashboard />} />
        <Route path='/course-listing' element={<CourseListing />} />
        <Route path='/course-listing/course-details' element={<CourseDetails />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route index element={<Home />} />
      </Routes>
    </>
  )
}

export const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        
      </Routes>
    </>
  ) 
}
export const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='login' element={<AdminLogin />} />
        <Route path='admin-dashboard' element={<AdminDashboard />} />
        <Route path='admin-CreateCourse' element={<CreateCourse />} />
        <Route path='users/user-list' element={<UserList />} />
        <Route path='users/add-user' element={<AddUser />} />
        <Route path='admin-EditCourse' element={<EditCourse />} />
        <Route path='courses/courses-list' element={<AdminCoursesList />} />
        <Route path='admin-CreateCategories' element={<CreateCategories/>} />
        <Route path='categories/categories-list' element={<AdminCategoriesList/>} />
        <Route path='admin-EditCategory' element={<EditCategories/>} />
      </Routes>
    </>

  );
}
