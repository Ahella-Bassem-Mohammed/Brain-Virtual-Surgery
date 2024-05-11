import React from 'react'
import { PatientItem } from './PatientItem'

export const PatientList = ({patients}) => {
  return (
    <div>
      {patients?.map((item) => 
        <PatientItem patient={item} key={item._id} />
      )}
    </div>
  );
}
