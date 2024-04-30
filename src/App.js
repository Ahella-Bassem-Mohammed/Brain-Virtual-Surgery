import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./Components/pages/Authentication/signup";
import ForgotPassword from "./Components/pages/Verification/ForgotPassword";
import ResetPassword from "./Components/pages/Verification/ResetPassword";
import NotFound from "./Components/pages/Verification/NotFound";
import { Profile } from "./Components/pages/Profile/Profile";
import PrivateComponent from "./Components/PrivateComponent";
import { VerifyEmail } from "./Components/pages/Verification/VerifyEmail";
import { Home } from "./Components/pages/Home/Home";
import { About } from "./Components/pages/About/About";
import { Contact } from "./Components/pages/Contact/Contact";
import { Services } from "./Components/pages/Services/Services";
import { Login } from "./Components/pages/Authentication/login";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            {/* -----------Routes user cannot access unless logging in --------------- */}
        
            <Route path="/profile" element={<Profile />} />
            {/*<Route path="/profile/:id" element={<Profile />} />*/}
          
          </Route>
          {/* -------------Public Routes--------------------------------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/verifyemail/:userId/verify/:token"
            element={<VerifyEmail />}
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:userId/:token"
            element={<ResetPassword />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
