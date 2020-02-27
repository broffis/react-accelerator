import React from 'react';

const note = (props) => {
  let bodyText = null
  if (props.content && props.content.length > 0) {
    bodyText = props.content.map((text, index) => {
      return <p key={`note-text-${index}`} className="body-text">{text}</p>
    })
  }
  return (
    <article>
      <h1 className="header-text">{props.headline}</h1>
      { bodyText }
    </article>
  );
}

export default note;