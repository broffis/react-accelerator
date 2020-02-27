import React from 'react';

const noteEdit = (props) => {
  return (
    <div>
      <label htmlFor="headline" className="input-label">Headline:</label>
      <input type="text" id="headline" className="input-header-text header-text" defaultValue={props.headline} onChange={props.headlineChanged} />
      <label htmlFor="note-text" className="input-label">Text</label>
      <textarea id="note-text" className="input-body-text body-text" defaultValue={props.content} onChange={props.bodyChanged} />
    </div>
  );
}

export default noteEdit;