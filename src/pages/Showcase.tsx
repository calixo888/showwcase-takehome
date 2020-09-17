import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  addEducation,
  getName,
  getEducation,
} from '../reducers/User.js';
import EducationModal from '../components/EducationModal.js';
import ShowcaseSidebar from '../components/ShowcaseSidebar.js';
import ShowcaseBody from '../components/ShowcaseBody.js';
import './Showcase.css';

function Showcase() {
  const name = useSelector(getName);
  const education = useSelector(getEducation);
  const [educationModalShow, setEducationModalShow] = useState(false);
  const [currentEducationIndex, setCurrentEducationIndex] = useState();

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
        <ShowcaseSidebar education={education} currentEducationIndex={currentEducationIndex} changeCurrentEducationIndex={(index) => setCurrentEducationIndex(index)} />

        <ShowcaseBody currentEducation={education[currentEducationIndex]} />
      </div>

      {educationModalShow ?
        <EducationModal isShow={educationModalShow} closeModal={() => setEducationModalShow(false)} />
        : ""
      }
    </div>
  )
}

export default Showcase;
