import React from 'react';

import Aux from './Aux';

const searchInput = (props) => (
  <Aux>
    <label htmlFor={props.id}>{props.label}</label>
    <input type={props.type} id={props.id} defaultValue={props.defaultValue} onChange={(e) => props.changed(e.target.value)}/>
  </Aux>
);

export default searchInput;