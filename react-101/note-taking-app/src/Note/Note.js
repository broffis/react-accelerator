import React from 'react';

const note = (props) => {
  let articleDisplay = null;

  if (props.isEditable) {
    return articleDisplay = (
      <article>
        <label htmlFor="headline">Headline:</label>
        <input type="text" id="headline" className="header-text" defaultValue={props.headline} />
        <label htmlFor="note-text">Text</label>
        <input type="text" id="note-text" className="body-text" defaultValue={props.content} />
      </article>
    )
  }

  if (!props.isEditable) {
    let bodyText = null
    if (props.content && props.content.length > 0) {
      bodyText = props.content.map((text, index) => {
        return <p key={`note-text-${index}`} className="body-text">{text}</p>
      })
    }

    return articleDisplay = (
      <article>
        <h1 className="header-text">{props.headline}</h1>
        { bodyText }
      </article>
    )
  }

  return (
    { articleDisplay }
  );
}

export default note;