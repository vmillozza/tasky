import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Signln';
import SignUp from './pages/SignUp';
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster} from 'react-hot-toast' ;
export default function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}