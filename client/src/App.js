import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import ChatRoom from './components/Chat/ChatRoom';
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

  const token = localStorage.getItem("x-token")
  
  
  const [isAuthenticated, setAuthentication] = useState(false);
  const [chatId, setChatId] = useState();
  const [chosen, setChosen] = useState();

  useEffect(() => {
    if (token && token !== "" && token !== undefined) {
      setAuthentication(true);
    }
    console.log("Here")
  }, [chosen])
  

  
  
  return (
    <div>
      <Routes>
        <Route path='/' element={!isAuthenticated ?<Login setAuthentication={setAuthentication} />:<Navigate to='/chat'/>}/>
        <Route path='/register' element={!isAuthenticated ?<Register setAuthentication={setAuthentication} />:<Navigate to='/chat' />}/>
        <Route path='/chat' element={<Chat chosen={chosen} setChosen={setChosen} isAuthenticated={isAuthenticated} setAuthentication={setAuthentication}/>}>
          <Route path=":chatId" element={<ChatRoom setChatId={setChatId} chosen={chosen} setChosen={setChosen} />}/>
        </Route>
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

