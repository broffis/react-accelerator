import React from 'react';

const noteSidebar = (props) => {

  return (
    <li onClick={props.click} className={props.isActiveNote ? 'active' : null}>
      <h3 className="header-text no-margin">{props.headline}</h3>
      <p className="body-text no-margin muted">Last Updated: {props.updatedTime} {props.updatedDate}</p>
    </li>
  );
}

export default noteSidebar;