import React from 'react';

const giphy = (props) => (
  <img src={`https://i.giphy.com/media/${props.id}/100.gif`} alt={props.title} key={props.id}/>
);

export default giphy;