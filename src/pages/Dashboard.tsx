import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addEducation,
  getName,
  getEducation,
} from '../reducers/User.js';
import Modal from 'react-modal';
import './Dashboard.css';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

function Dashboard() {
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

  useEffect(() => {
    console.log(newEducationStartDate);
    console.log(typeof newEducationStartDate);
  }, [newEducationStartDate]);

  return (
    <>
      <div className="dashboard-header">
        <h1>{name}'s Dashboard</h1>
        <button type="button" onClick={showEducationModal}>Add Education</button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-sidebar">
          <h3>Education</h3>
          <ul>
            {education.map((educationObj, i) => (
              <li onClick={() => setCurrentEducationIndex(i)}>{educationObj.institute}</li>
            ))}
          </ul>
        </div>

        <div className="dashboard-body">
          {education[currentEducationIndex] ?
            <div>
              <h3>{education[currentEducationIndex].institute}</h3>
              <h5>{getReadableDate(education[currentEducationIndex].startDate)} - {education[currentEducationIndex].endDate ? getReadableDate(education[currentEducationIndex].endDate) : "Present"}</h5>
              <p>{education[currentEducationIndex].description}</p>
            </div> : "No education exists yet!"
          }
        </div>
      </div>

      <Modal isOpen={educationModalShow} onRequestClose={hideEducationModal} style={customStyles}>
        <h3>Add Education</h3>

        <form onSubmit={addCurrentEducation}>
          <input type="text" placeholder="Institute" value={newEducationInstitute} onChange={(e) => {
            setNewEducationInstitute(e.target.value);
          }} required />

          <input type="date" placeholder="Start Date" value={newEducationStartDate} onChange={(e) => {
            setNewEducationStartDate(e.target.value);
          }} required />

          <input type="date" placeholder="End Date" value={newEducationEndDate} onChange={(e) => {
            setNewEducationEndDate(e.target.value);
          }} />

          <input type="text" placeholder="Description" value={newEducationDescription} onChange={(e) => {
            setNewEducationDescription(e.target.value);
          }} required />

          <input type="submit" value="Save" />
        </form>
      </Modal>
    </>
  )
}

export default Dashboard;
