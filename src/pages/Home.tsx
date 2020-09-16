import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addName,
  getName,
} from '../reducers/User.js';
import { useHistory } from 'react-router-dom';
import './Home.css';

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // FUNCTION TO RUN ONCE NAME IS INPUTTED
  const goToShowcase = () => {
    // VALIDATE THAT NAME WAS INPUTTED
    if (name) {
      // MODIFY REDUX STATE + REDIRECT TO SHOWCASE
      dispatch(addName(name));
      history.push("/showcase");
    } else {
      setError("Error: You must input a name."); // DISPLAY ERROR TO USER
    }
  }

  return (
    <div className="center-container">
      <p style={{ marginBottom: "25px" }}>Hi there! Welcome to your education showcase.</p>

      <p style={{ marginBottom: "15px" }}>Type your name and click "Enter" below to begin!</p>
      <input style={{ marginBottom: "10px" }} type="text" placeholder="Your name" onChange={e => {
        setName(e.target.value);
      }} />
      <button type="button" onClick={goToShowcase}>Enter!</button>
      <small className="error" style={{ marginTop: "10px" }}>{error}</small>
    </div>
  )
}

export default Home;
