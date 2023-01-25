import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const toaster = {
  success: () => toast.success('🎉 You have successfuly logged in.', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  }),
  error: (msg) => toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  }),
}

function App() {

  const [isAuthenticated, setAuthentication] = useState(false);

  
  const token = localStorage.getItem("x-token")
  useEffect(() => {
    console.log("Hello")
    if (token && token !== "" && token !== undefined) {
      setAuthentication(true);
    }
    console.log(token)
    console.log(isAuthenticated)

  }, [])
  return (
    <div>
      <Routes>
        <Route path='/' element={!isAuthenticated ?<Login setAuthentication={setAuthentication} />:<Navigate to='/chat'/>}/>
        <Route path='/register' element={!isAuthenticated ?<Register setAuthentication={setAuthentication} />:<Navigate to='/chat' />}/>
        <Route path='/chat' element={<Chat isAuthenticated={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path='*' element={<Navigate to='/' />}/>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App ;

