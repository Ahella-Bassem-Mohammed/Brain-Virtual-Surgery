import "./mriRoom.css"
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { getSingleMRI } from '../../../redux/apiCalls/mriApiCall';
import { useParams } from 'react-router-dom';
import BrainViewer from "../../Brain-Viewer/BrianViewer";


// How the MRI is manipulated with our model

export const MRIRoom = () => {

  const dispatch=useDispatch();
  const [file] = useState(null);
  const { mri } = useSelector((state) => state.mri || []);
  const {id}=useParams();
  

console.log(id)

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleMRI(id));
  }, [dispatch,id]);



  return (
    <div className="margin">
      MRI-Room

      <strong>Image :</strong>
      <img
        src={file ? URL.createObjectURL(file) : mri?.Image?.url}
        alt="MRI Scan"
        className="imge"
      />
      <BrainViewer/>
    </div>

  );
}
