import React from "react";
import { MRIItem } from "./MRIItem";

export const MRIList = ({ mris }) => {
  return (
    <div className="mri-list">
      {mris?.map((item) => (
        <MRIItem mri={item} key={item._id}  />
      ))}
    </div>
  );
};
