import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addEducation } from '../reducers/User.js';
import './EducationModal.css';

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

function EducationModal({ closeModal, isShow }) {
  const dispatch = useDispatch();

  const [show] = useState(isShow);

  const [newEducationInstitute, setNewEducationInstitute] = useState("");
  const [newEducationStartDate, setNewEducationStartDate] = useState();
  const [newEducationEndDate, setNewEducationEndDate] = useState();
  const [newEducationDescription, setNewEducationDescription] = useState("");

  const [showInstituteList, setShowInstituteList] = useState(false);
  const [instituteList, setInstituteList] = useState([]);

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

    closeModal(); // CLOSE MODAL
  }

  const loadNewUniversities = () => {
    // LIMIT TO US TO MAKE REQUEST FASTER
    axios.get(`http://universities.hipolabs.com/search?name=${newEducationInstitute}&country=United%20States`).then(response => {
      setInstituteList(response.data);
    });
  }

  useEffect(loadNewUniversities, [newEducationInstitute]);

  return (
    <Modal isOpen={show} onRequestClose={closeModal} style={customStyles}>
      <h2>Add Education</h2>

      <form className="education-modal" onSubmit={addCurrentEducation}>
        <label>Educational Institute:</label>
        <div className="institute-container">
          <input type="text" placeholder="Institute" value={newEducationInstitute} onChange={(e) => {
            setNewEducationInstitute(e.target.value);
          }} onFocus={() => setShowInstituteList(true)} required />
          <div className="institute-list">
            {showInstituteList ?
              instituteList.length > 0 ?
                instituteList.map((institute, i) => (
                  <span className="institute" onClick={() => {
                    setNewEducationInstitute(institute.name);
                    setShowInstituteList(false);
                  }}>{institute.name}</span>
                ))
                :
                <span className="institute">No institutes found!</span>
              : ""
            }
          </div>
        </div>

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
  )
}

export default EducationModal;
