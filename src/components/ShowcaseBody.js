import React from 'react';
import './ShowcaseBody.css';

function ShowcaseBody({ currentEducation }) {
  const getReadableDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  }

  return (
    <div className="showcase-body">
      {currentEducation ?
        <div>
          <h2>{currentEducation.institute}</h2>
          <div style={{
            marginTop: "15px",
            marginBottom: "10px"
          }}>{getReadableDate(currentEducation.startDate)} - {currentEducation.endDate ? getReadableDate(currentEducation.endDate) : "Present"}</div>
          <p>{currentEducation.description}</p>
        </div> : "No education exists yet!"
      }
    </div>
  )
}

export default ShowcaseBody;
