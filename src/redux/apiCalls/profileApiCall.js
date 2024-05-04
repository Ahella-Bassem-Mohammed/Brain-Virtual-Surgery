import { profileActions } from "../slices/profileSlice";
import {authActions} from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Get User Profile
export function getUserProfile(userId) {
  return async (dispatch,getState) => {
    try {
      const token=getState().auth.user.token;
      if(!token){throw new Error("User is not authenticated !!");}
      const { data } = await request.get(`/api/users/${userId}`,
      {headers:{token:`${token}`}});
      
       
      dispatch(profileActions.setProfile(data));
     
    } catch (error) {
       if (error.response && error.response.data) {
         toast.error(error.response.data.message);
       } else {
         toast.error("Failed to fetch user profile");
       }
    }
  };
}


// Upload Profile Photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch,getState) => {
    try {
      
      const { data } = await request.post(`/api/users/profile-photo-upload`,newPhoto,{
        headers:{token:getState().auth.user.token,
    "Content-Type":"multipart/form-data"}
      });
      dispatch(profileActions.setProfilePhoto(data.ProfilePhoto));
      dispatch(authActions.setUserPhoto(data.ProfilePhoto));
      toast.success(data.message);

      // modify the user in local storage with new photo
      const user=JSON.parse(localStorage.getItem("userInfo"));
      user.ProfilePhoto=data?.ProfilePhoto;
      localStorage.setItem("userInfo",JSON.stringify(user));

     
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}


// Update User Profile
export function updateProfile(userId,profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/${userId}`,
        profile,
        {
          headers: {
            token: getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.UserName));
     

      // modify the user in local storage with new username

      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.UserName = data?.UserName;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}


// Delete User Profile (Account)
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(
        `/api/users/${userId}`,
        {
          headers: {
            token: getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setIsProfileDeleted(data));
      toast.success(data?.message)
      setTimeout(()=>dispatch(profileActions.clearIsProfileDeleted()),2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileActions.clearLoading());
    }
  };
}
