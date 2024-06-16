import { Navigate, Route  } from "react-router-dom";
import App from "../App";
import ActivityTracker from "../view/Activity/ActivityTracker";
import Login from "../view/Login/login";
import SingUp from "../view/SingUp/SingUp";
import PageNotFound from "../Assets/PageNotFound.svg"

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <img src={PageNotFound} alt="404 Not Found" className="w-full max-w-md md:max-w-lg lg:max-w-xl" />
    </div>  );
};
const  homeRoute=()=> {
  return(
  <Route path='/' element={<App/>} ErrorBoundary={ErrorPage}>
    <Route path='' element={<ActivityTracker/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='signup' element={<SingUp/>}/>
  </Route>
  );
}

export default homeRoute
