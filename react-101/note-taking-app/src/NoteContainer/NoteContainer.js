import React from 'react';

import Button from '../Button/Button';
import Note from '../Note/Note';

const noteContainer = (props) => {

  return (
    <main>
      <header>
        <p className="body-text no-margin muted">Last Updated: {props.currentNote.updatedTime} {props.currentNote.updatedDate}</p>
        <div className="button-group">
          <Button
            classList='button primary header-text'
            display='primary'
            value='Edit Note' />
          <Button
            classList='button secondary header-text'
            display='secondary'
            value='Delete Note' />
        </div>
      </header>
      <Note headline={props.currentNote.headline} content={props.currentNote.content} />
    </main>
  );
}

export default noteContainer;