import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addName,
  getName,
} from '../reducers/User.js';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // FUNCTION TO RUN ONCE NAME IS INPUTTED
  const goToDashboard = () => {
    // VALIDATE THAT NAME WAS INPUTTED
    if (name) {
      // MODIFY REDUX STATE + REDIRECT TO DASHBOARD
      dispatch(addName(name));
      history.push("/dashboard");
    } else {
      setError("Error: You must input a name."); // DISPLAY ERROR TO USER
    }
  }

  return (
    <div className="center-container">
      <h1>Hello world!</h1>
      <input type="text" placeholder="Enter your name" onChange={e => {
        setName(e.target.value);
      }} />
      <button type="button" onClick={goToDashboard}>Enter!</button>
      <small>{error}</small>
    </div>
  )
}

export default Home;
