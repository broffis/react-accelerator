import React from 'react';

import Button from '../Button/Button';
import NoteSidebar from '../NoteSidebar/NoteSidebar';

const sidebar = (props) => {
  const selectNote = (id) => {
    console.log('selectNote id', id);
    return props.selectNoteClick(id);
  }

  let notes = null

  if (props.notes.length >= 1) {
    notes = props.notes.map(note => {
      return <NoteSidebar
        key={`note-preview-${note.id}`}
        headline={note.headline}
        updatedDate={ note.updatedDate !== '' ? note.updatedDate : note.createdDate }
        updatedTime={ note.updatedTime !== '' ? note.updatedTime : note.createdTime }
        click={() => selectNote(note.id)}
        isActiveNote={props.activeNoteId === note.id ? 'active' : null }/>
    })
  }

  return (
    <aside className="sidebar">
      <Button
        value="Create Note"
        display='tertiary block'
        click={props.createNoteClick()} />
      <ul>
        { notes }
      </ul>
    </aside>
  );
};

export default sidebar;