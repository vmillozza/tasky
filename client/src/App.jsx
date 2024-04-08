import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Signln';
import SignUp from './pages/SignUp';
import { ChakraProvider } from '@chakra-ui/react'
//import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/UserContext';
import Profile from './pages/Profile' ;
import PrivateRoute from './components/PrivateRoute';
export default function App() {
  return (
    <UserProvider>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </UserProvider>
  );
}