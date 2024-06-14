import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import { Signup } from "./Components/pages/Authentication/signup";
import { Login } from "./Components/pages/Authentication/login";
import { VerifyEmail } from "./Components/pages/Verification/VerifyEmail";
import {ForgotPassword} from "./Components/pages/Verification/ForgotPassword";
import {ResetPassword} from "./Components/pages/Verification/ResetPassword";
import {NotFound} from "./Components/pages/Verification/NotFound";
import { Profile } from "./Components/pages/Profile/Profile";
import { Home } from "./Components/pages/Home/Home";
import { About } from "./Components/pages/About/About";
import { Contact } from "./Components/pages/Contact/Contact";
import { Services } from "./Components/pages/Services/Services";
import {PatientDetails} from "./Components/Patient-Component/Patient-Details/PatientDetails";
import { AddPatient } from "./Components/Patient-Component/Add-Patient/AddPatient";
import {MRIRoom } from "./Components/MRI-Component/MRI-Room/MRIRoom";
import {PrivateComponent} from "./Components/PrivateComponent";




function App() {

 
  return (
    <>
      <div className="App">
       
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            {/* -----------Routes user cannot access unless logging in --------------- */}

            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/addpatient" element={<AddPatient />} />
            <Route path="/patientdetails/:id" element={<PatientDetails />} />
            <Route path="/patientdetails/mriroom" element={<MRIRoom />} /> 
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