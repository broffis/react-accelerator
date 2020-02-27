import React from 'react';

const noteEdit = (props) => {
  return (
    <article>
      <label htmlFor="headline">Headline:</label>
      <input type="text" id="headline" className="header-text" defaultValue={props.headline} />
      <label htmlFor="note-text">Text</label>
      <input type="text" id="note-text" className="body-text" defaultValue={props.content} />
    </article>
  );
}

export default noteEdit;