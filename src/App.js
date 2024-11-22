import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navb from './Components/Navb';
import Home from './Pages/Home';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { current } from './Redux/Actions/UserActions';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
/* import Profile from './Pages/Profile'; */
import Dashboard from './Pages/Dashboard';
import Resources from './Pages/Resources';






function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (token) {
      dispatch(current())
    }

  }, [])
  return (
    <div className="App">
      <Navb />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/Signup' element={<SignUp />} /> 
        {/* <Route path="/Profile" element={<Profile />}/> */}
        <Route path="/Dashboard" element={<Dashboard />}/>

      </Routes>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
{/* Same as */}
<ToastContainer />
    </div>
  );
}

export default App;