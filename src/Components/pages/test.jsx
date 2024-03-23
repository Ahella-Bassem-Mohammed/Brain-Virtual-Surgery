import React from 'react';
import {useState} from 'react' ;
import './LoginSignup/LoginSignup.css';
import { BiMessageRoundedDetail,BiMessageSquareDots  } from "react-icons/bi";
import { FaUser,FaLock,FaTransgender  } from "react-icons/fa";
import { MdEmail,MdSubtitles } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/*export const Signup=()=>{
    
    const[fname,setFName]=useState("");
    const[lname,setLName]=useState("");
    const[uname,setUName]=useState("");
    const[email,setEmail]=useState("");
    const[age,setAge]=useState("");
    const[gender,setGender]=useState("");
    const[title,setTitle]=useState("");
    const[specialist,setSpecialist]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    const collectData=async()=>{
        console.warn(fname,lname,uname,email,age,gender,title,specialist,password);
        const response = await axios.post(
         "https://virtual-surgery.onrender.com/api/auth/register",
         {
          FirstName: fname,
          LastName: lname,
          UserName: uname,
          Email: email,
          Age: age,
          Gender: gender,
          Title: title,
          Specialist: specialist,
          Password: password,
         },
         {
          headers: {
           "Content-Type": "application/json",
          },
         }
        );

        console.warn(response.data);
        navigate("/");
    }

    return (
        <div className="signup">
        <div className='container'>
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" placeholder='First Name' value={fname} onChange={(e)=>setFName(e.target.value)}  />
                    <FaUser className='icon' />
                </div>

                <div className="input">
                    <input type="text" placeholder='Last Name' value={lname} onChange={(e)=>setLName(e.target.value)}  />
                    <FaUser className='icon' />
                </div>

                <div className="input">
                    <input type="text" placeholder='User Name' value={uname} onChange={(e)=>setUName(e.target.value)}  />
                    <FaUser className='icon' />
                </div>

                <div className="input">
                    <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}  />
                    <MdEmail className='icon' />
                </div>

                <div className="input">
                    <input type="text" placeholder='Age' value={age} onChange={(e)=>setAge(e.target.value)}  />
                    <BiMessageRoundedDetail className='icon' />
                </div>

                <div className="input">
                    <input type="text" placeholder='Gender' value={gender} onChange={(e)=>setGender(e.target.value)}  />
                    <FaTransgender className='icon' />
                </div>

                <div className="input">
                    <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}  />
                    <MdSubtitles className='icon' />
                </div>

                <div className="input">
                    <input type="text" placeholder='Specialist' value={specialist} onChange={(e)=>setSpecialist(e.target.value)}  />
                    <BiMessageSquareDots  className='icon' />
                </div>

                <div className="input">
                    <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    <FaLock className='icon' />
                </div>
               
                <div className="submit-container">
                   <center> <button type='button' className='submit' onClick={collectData} > Sign  Up</button></center>
                </div>
            </div>
           </div>
        </div>
    );
}*/


//login//////////////////////////////////////////////////////////////////////////////////////////////////////////////






/*import React, { useState } from 'react';
import './LoginSignup/LoginSignup.css';
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/apiCalls/authApiCall';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        if (email.trim() === "") {
            setErrorMessage("Email is required");
            return;
        }
        if (password.trim() === "") {
            setErrorMessage("Password is required");
            return;
        }

        try {
            // Send login request to server
            const response = await fetch("https://virtual-surgery.onrender.com/api/auth/login", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Check server response
            if (response.ok) {
                // Authentication successful, redirect user to authenticated part of the application
                const userData = await response.json();
                dispatch(loginSuccess(userData)); // Dispatch action to store user data in Redux state
                navigate('/Home'); // Redirect to dashboard or any other authenticated route
            } else {
                // Authentication failed, display error message
                setErrorMessage("Invalid email or password");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("An unexpected error occurred");
        }
    };

    return (
        <div className='login'>
            <div className='container'>
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
                <form onSubmit={formSubmitHandler}>
                    <div className="inputs">
                        <div className="input">
                            <input type="text" id="username" autoComplete="email" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                            <FaUser className='icon' />
                        </div>
                        <div className="input">
                            <input type="password" id="email" autoComplete="current-password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                            <FaLock className='icon' />
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <div className="forgot-password">
                            <label>
                                <input type="checkbox" name='rememberme' id='rememberme' />Remember me
                            </label>
                            <a href="ForgotPassword">Forgot Password?</a>
                        </div>
                        <div className="submit-container">
                            <center><button type='submit' className='submit'> Login </button></center>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
*/

