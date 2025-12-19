import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Diary from './pages/Diary';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for toastify
import Register from "./pages/Register";
import AddCase from "./pages/AddCase";
import ReadCase from "./pages/ReadCase";
import EndorseCase from "./pages/EndorseCase";
import { ConfirmProvider } from 'material-ui-confirm';
import EditCase from "./pages/EditCase";
import Users from "./pages/Users";
import ReadUser from "./pages/ReadUser";


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeout =100;
    setTimeout(function () {
    setIsLoading(false);
    }, timeout);
  }, []);

  if (isLoading) {
    return (
            <>
              <Skeleton  height={80}  />
              <Skeleton height={600}  />
              <Skeleton height={300}  />
          
         </>
    );
  }

  return (
 <>
  
 <ConfirmProvider>
 <BrowserRouter>
 <Routes>
  <Route path='/' element={ <Home />} />
   <Route path='/login' element={ <Login />} />
   
    <Route path='/diary' element={ <Diary />} />
    <Route path='/users' element={ <Users />} />
     <Route path='/readUser/:id' element={ <ReadUser />} />
      <Route path='/register' element={ <Register />} />
        <Route path='/addCase' element={ <AddCase />} />
       <Route path='/readCase/:id' element={ <ReadCase />} />
           <Route path='/endorseCase/:id' element= {<EndorseCase />} />
           <Route path='/editCase/:id' element= {<EditCase />} />
 </Routes>
  
 </BrowserRouter>
 </ConfirmProvider>

 </>
  );
};

export default App;
