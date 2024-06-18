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
  const { mri } = useSelector((state) => state.mri || null);
  const {id}=useParams();
  

console.log(id)

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleMRI(id));
  }, [dispatch,id]);

   if(!mri) return <div> ERROR </div>


  return (
    <div className="margin">
      MRI-Room
      <div>
        {" "}
        <div style={{display: "flex", rowGap: "10px", columnGap: "10px"}}>
          {mri?.results?.map((result, index) => (
            
             
              <img
                style={{ width: "200px", height: "200px" }}
                src={result.secure_url}
                key={index}
              />
            
          ))}{" "}
        </div>
      </div>
      <BrainViewer renderFile={mri.displayedNII.secure_url} />
    </div>
  );
}
