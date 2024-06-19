import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

//Login User

export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

//Logout User

export function logoutUser(navigate) {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
    navigate("/",{replace:true})
  };
}

//Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      console.log(error);
    }
  };
}

/*/ Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      const response = await request.get(`/api/auth/${userId}/verify/${token}`);
      const { message, redirectTo } = response.data;

      
      dispatch(authActions.setIsEmailVerified());

      
      if (redirectTo) {
        window.location.href = redirectTo;
      }

      
      dispatch(authActions.showSuccessMessage(message));
    } catch (error) {
      console.error(error);
      // Handle error
      dispatch(authActions.showErrorMessage(error.response.data.message));
    }
  };
}*/