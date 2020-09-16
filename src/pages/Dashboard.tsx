import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addName,
  getName,
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
  const dispatch = useDispatch();
  const [educationModalShow, setEducationModalShow] = useState(false);

  const showEducationModal = () => {
    setEducationModalShow(true);
  }

  const hideEducationModal = () => {
    setEducationModalShow(false);
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

      <Modal isOpen={educationModalShow} onRequestClose={hideEducationModal} style={customStyles}>
        <h3>Add Education</h3>
      </Modal>
    </div>
  )
}

export default Dashboard;
