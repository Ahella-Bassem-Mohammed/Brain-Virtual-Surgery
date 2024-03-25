import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  About,
  Contact,
  Services,
  Login,
  Signup,
} from "./Components/pages";
import ForgotPassword from "./Components/pages/ForgotPassword";
import ResetPassword from "./Components/pages/ResetPassword";
import NotFound from "./Components/pages/NotFound";
import { Profile } from "./Components/pages/Profile";
import PrivateComponent from "./Components/PrivateComponent";
import { VerifyEmail } from "./Components/pages/verify-email/VerifyEmail";

function App() {
 
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            {/* -----------Routes user cannot access unless logging in --------------- */} 
            <Route path="/Profile" element={<Profile />} />



          </Route>
          {/* -------------Public Routes--------------------------------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyemail/:userId/verify/:token" element={<VerifyEmail/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
