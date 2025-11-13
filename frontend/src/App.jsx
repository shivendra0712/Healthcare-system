
import Layout from './routes/Layout'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { fetchCurrentUser } from './store/slices/authSlice'


const App = () => {
   const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // agar token hai toh server se user fetch karo
      dispatch(fetchCurrentUser());
    }
  }, []);


  return (
   <>
   <Layout />
   </>
  )
}

export default App