import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addEducation,
  getName,
  getEducation,
} from '../reducers/User.js';
import Modal from 'react-modal';
import './Showcase.css';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px'
  }
};

function Showcase() {
  const name = useSelector(getName);
  const education = useSelector(getEducation);
  const dispatch = useDispatch();
  const [educationModalShow, setEducationModalShow] = useState(false);

  const [currentEducationIndex, setCurrentEducationIndex] = useState();

  const [newEducationInstitute, setNewEducationInstitute] = useState("");
  const [newEducationStartDate, setNewEducationStartDate] = useState();
  const [newEducationEndDate, setNewEducationEndDate] = useState();
  const [newEducationDescription, setNewEducationDescription] = useState("");

  const showEducationModal = () => {
    setEducationModalShow(true);
  }

  const hideEducationModal = () => {
    setEducationModalShow(false);
  }

  const addCurrentEducation = (e) => {
    e.preventDefault();

    dispatch(addEducation({
      institute: newEducationInstitute,
      startDate: newEducationStartDate,
      endDate: newEducationEndDate,
      description: newEducationDescription
    }));

    // RESETTING CURRENT EDUCATION INPUTS
    setNewEducationInstitute("");
    setNewEducationStartDate(undefined);
    setNewEducationEndDate(undefined);
    setNewEducationDescription("");

    setEducationModalShow(false); // CLOSE MODAL
  }

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
        <button style={{ marginTop: "15px" }} type="button" onClick={showEducationModal}>Add Education</button>
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

      <Modal isOpen={educationModalShow} onRequestClose={hideEducationModal} style={customStyles}>
        <h2>Add Education</h2>

        <form className="education-modal" onSubmit={addCurrentEducation}>
          <label>Educational Institute:</label>
          <input type="text" placeholder="Institute" value={newEducationInstitute} onChange={(e) => {
            setNewEducationInstitute(e.target.value);
          }} required />

          <label>Start Date:</label>
          <input type="date" value={newEducationStartDate} onChange={(e) => {
            setNewEducationStartDate(e.target.value);
          }} required />

          <label>End Date:</label>
          <input type="date" value={newEducationEndDate} onChange={(e) => {
            setNewEducationEndDate(e.target.value);
          }} />

          <label>Education Description:</label>
          <textarea rows={5} placeholder="Description" value={newEducationDescription} onChange={(e) => {
            setNewEducationDescription(e.target.value);
          }} required></textarea>

          <input type="submit" value="Save" />
        </form>
      </Modal>
    </div>
  )
}

export default Showcase;
