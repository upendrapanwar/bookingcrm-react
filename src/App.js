import React,{Suspense,lazy} from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css';
//import './index.css';
import './output.css';

const Register = lazy(() => import('./containers/user/register'));
const Login = lazy(() => import('./containers/user/login'));

const AdminLogin = lazy(() => import('./containers/admin/Login'));

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
        <Route index element={<Register />} />
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
      </Routes>
    </>

  );
}
