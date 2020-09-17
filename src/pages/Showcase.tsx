import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  addEducation,
  getName,
  getEducation,
} from '../reducers/User.js';
import EducationModal from '../components/EducationModal.js';
import './Showcase.css';

function Showcase() {
  const name = useSelector(getName);
  const education = useSelector(getEducation);
  const [educationModalShow, setEducationModalShow] = useState(false);

  const [currentEducationIndex, setCurrentEducationIndex] = useState();

  const getReadableDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  }

  // REDIRECT TO HOME IF NAME DOES NOT EXIST
  useEffect(() => {
    if (!name) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (education.length > 0) {
      if (!currentEducationIndex) {
        setCurrentEducationIndex(0);
      }
    }
  }, [education]);

  return (
    <div className="showcase">
      <div className="showcase-header">
        <h1>Welcome to {name}'s education showcase</h1>
        <button style={{ marginTop: "15px" }} type="button" onClick={() => setEducationModalShow(true)}>Add Education</button>
      </div>

      <div className="showcase-grid">
        <div className="showcase-sidebar">
          <h3>Education</h3>
          <ul className="education-list">
            {education.map((educationObj, i) => (
              <li className={currentEducationIndex == i ? "selected" : ""} onClick={() => setCurrentEducationIndex(i)}>{educationObj.institute}</li>
            ))}
          </ul>
        </div>

        <div className="showcase-body">
          {education[currentEducationIndex] ?
            <div>
              <h2>{education[currentEducationIndex].institute}</h2>
              <div style={{
                marginTop: "15px",
                marginBottom: "10px"
              }}>{getReadableDate(education[currentEducationIndex].startDate)} - {education[currentEducationIndex].endDate ? getReadableDate(education[currentEducationIndex].endDate) : "Present"}</div>
              <p>{education[currentEducationIndex].description}</p>
            </div> : "No education exists yet!"
          }
        </div>
      </div>

      {educationModalShow ?
        <EducationModal isShow={educationModalShow} closeModal={() => {
          setEducationModalShow(false);
        }} />
        :
        <></>
      }
    </div>
  )
}

export default Showcase;
