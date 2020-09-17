import React, { useState, useEffect } from 'react';
import './ShowcaseSidebar.css';

function ShowcaseSidebar({ education, currentEducationIndex, changeCurrentEducationIndex }) {
  return (
    <div className="showcase-sidebar">
      <h3>Education</h3>
      <ul className="education-list">
        {education.map((educationObj, i) => (
          <li className={currentEducationIndex == i ? "selected" : ""} onClick={() => changeCurrentEducationIndex(i)}>{educationObj.institute}</li>
        ))}
      </ul>
    </div>
  )
}

export default ShowcaseSidebar;
