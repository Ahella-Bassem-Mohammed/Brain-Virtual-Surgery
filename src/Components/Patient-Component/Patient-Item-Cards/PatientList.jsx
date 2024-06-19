import React from 'react'
import { PatientItem } from './PatientItem'

export const PatientList = ({patients}) => {
  return (
    <div className='patient-list'>
      {patients?.map((item) => 
        <PatientItem patient={item} key={item._id} />
      )}
    </div>
  );
}
