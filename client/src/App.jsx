import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Login } from "./components/pages/authPg/login";
import { Signup } from "./components/pages/authPg/signup";
import { UserHome } from "./components/pages/userPg/home";
import { Logout } from "./components/pages/authPg/logout";
import { UseContext } from "./storage/auth";

function App() {
  const {isUserLogin}= UseContext();
  const location = useLocation();
  const noNavbarRoutes = ["/", "/signup"];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={ isUserLogin? <Navigate to="/home"/> : <Login />} />
        <Route path="/signup" element={isUserLogin? <Navigate to="/home"/> : <Signup />} />
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/home" element={<UserHome />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
