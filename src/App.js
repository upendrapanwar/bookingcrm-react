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

const Home = lazy(() => import('./containers/Home'));
const Register = lazy(() => import('./containers/Register'));
const Login = lazy(() => import('./containers/Login'));
const StudentDashboard = lazy(() => import('./containers/student/StudentDashboard'));
const InstructorDashboard = lazy(() => import('./containers/instructor/InstructorDashboard'));
const ManagerDashboard = lazy(() => import('./containers/manager/ManagerDashboard'));

const AdminLogin = lazy(() => import('./containers/admin/Login'));
const AdminDashboard = lazy(() => import('./containers/admin/AdminDashboard'));

function App() {
    
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />

    <Routes>
      <Route path="/*" element={
        <Suspense>
          <PublicRoutes />
          
        </Suspense>
        } 
      />

      <Route path="/admin/*" element={
          <AdminRoutes />
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
      </Routes>
    </>

  );
}
