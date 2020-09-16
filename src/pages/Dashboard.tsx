import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addEducation,
  getName,
  getEducation,
} from '../reducers/User.js';
import Modal from 'react-modal';

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

  const [currentEducationTitle, setCurrentEducationTitle] = useState("");

  const showEducationModal = () => {
    setEducationModalShow(true);
  }

  const hideEducationModal = () => {
    setEducationModalShow(false);
  }

  const handleCurrentEducationTitle = (event) => {
    setCurrentEducationTitle(event.target.value);
  }

  const addCurrentEducation = () => {
    dispatch(addEducation({
      title: currentEducationTitle
    }));
    setCurrentEducationTitle(""); // RESETTING CURRENT EDUCATION INPUT
    setEducationModalShow(false); // CLOSE MODAL
  }

  // REDIRECT TO HOME IF NAME DOES NOT EXIST
  useEffect(() => {
    if (!name) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="center-container">
      <h1>{name}'s Dashboard</h1>

      <button type="button" onClick={showEducationModal}>Add Education</button>

      <h3>Education</h3>
      <ul>
        {education.map((educationObj, i) => (
          <li>{educationObj.title}</li>
        ))}
      </ul>

      <Modal isOpen={educationModalShow} onRequestClose={hideEducationModal} style={customStyles}>
        <h3>Add Education</h3>
        <input type="text" placeholder="Education Title" value={currentEducationTitle} onChange={handleCurrentEducationTitle} />
        <button type="button" onClick={addCurrentEducation}>Save</button>
      </Modal>
    </div>
  )
}

export default Dashboard;
