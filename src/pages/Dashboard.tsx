import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addName,
  getName,
} from '../reducers/User.js';

function Dashboard() {
  const name = useSelector(getName);
  const dispatch = useDispatch();

  // REDIRECT TO HOME IF NAME DOES NOT EXIST
  useEffect(() => {
    if (!name) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="center-container">
      <h1>{name}'s Dashboard</h1>
    </div>
  )
}

export default Dashboard;
