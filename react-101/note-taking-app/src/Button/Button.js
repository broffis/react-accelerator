import React from 'react';

const button = (props) => {

  return (
    <button
      type="button"
      className={`button header-text ${props.display}`}
      onClick={props.click}>{props.value}</button>
  )
};

export default button;