import "./verification.css";
import React, { useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch} from "react-redux";
import { verifyEmail } from "../../../redux/apiCalls/authApiCall";


export const VerifyEmail = () => {
  
  const dispatch = useDispatch();
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [dispatch,userId, token]);
  

  return (
    <section className="verify-email">
      
        <>
          <i className="bi bi-patch-check verify-email-icon"> </i>
          <h1 className="verify-email-title">
            Your email address has been successfully verified
          </h1>
          <Link to="/login" className="verify-email-link">
            Go to Login Page
          </Link>
        </>
      
       
      
    </section>


  )};
