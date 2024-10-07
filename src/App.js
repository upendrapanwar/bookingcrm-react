import React,{Suspense,lazy} from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css';
//import './index.css';
import './output.css';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('./containers/Home'));
const Register = lazy(() => import('./containers/user/register'));
const Login = lazy(() => import('./containers/user/login'));

const AdminLogin = lazy(() => import('./containers/admin/Login'));
const AdminDashboard = lazy(() => import('./containers/admin/AdminDashboard'));

function App() {
    
  return (
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
  );

}

export default App;

export const PublicRoutes = () => {
  return ( 
    <>
      <Routes>
        <Route path='login' element={<Login />} /> 
        <Route path='register' element={<Register />} />
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
