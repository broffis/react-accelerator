import React, { useEffect, useRef } from 'react';
import classes from './Cockpit.css'

const cockpit = (props) => {
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Http request
    // const timer = setTimeout(() => {
    //   alert('Saved data to cloud!');
    // },1000);
    toggleBtnRef.current.click();
    return () => {
      // clearTimeout(timer);
      console.log('[Cockpit.js] cleanup work in useEffect')
    };
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] second useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in second useEffect')
    };
  });

  const assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }

  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }
  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
        <p className={assignedClasses.join(' ')}>This is really working</p>
        <button
          ref={toggleBtnRef}
          className={btnClass}
          onClick={props.clicked}>
          Toggle Persons
        </button>
        <button onClick={props.login}>Login</button>
    </div>
  );
};

export default React.memo(cockpit);