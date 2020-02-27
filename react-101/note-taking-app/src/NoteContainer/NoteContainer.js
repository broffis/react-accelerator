import React from 'react';

import Button from '../Button/Button';
import Note from '../Note/Note';
import NoteEdit from '../NoteEdit/NoteEdit';

const noteContainer = (props) => {
  let noteIsEditable = false;
  let noteDisplay = <Note headline={props.currentNote.headline} content={props.currentNote.content} />;

  const deleteNote = (id) => {
    noteIsEditable = false;
    if (!id) return false;

    return props.deleteNoteClick(id);
  }

  const editNote = (note) => {
    if (!note) return false;

    if (!note.headline && !note.content) deleteNote(note.id)

    noteIsEditable = !noteIsEditable;

    console.log('noteIsEditable', noteIsEditable)

    if (noteIsEditable) {
      noteDisplay = (<NoteEdit headline={props.currentNote.headline} content={props.currentNote.content} />);
    }

    console.log('noteDisplay', noteDisplay);

    if (!noteIsEditable) {
      noteDisplay = (<Note headline={props.currentNote.headline} content={props.currentNote.content} />);
      return props.editNoteClick(note);
    };
  }

  return (
    
    <main>
      <header>
        <p className="body-text no-margin muted">Last Updated: {props.currentNote.updatedTime} {props.currentNote.updatedDate}</p>
        <div className="button-group">
          <Button
            classList='button primary header-text'
            display='primary'
            click={() => editNote(props.currentNote)}
            value='Edit Note' />
          <Button
            classList='button secondary header-text'
            display='secondary'
            click={() => deleteNote(props.currentNote.id)}
            value='Delete Note' />
        </div>
      </header>
      { noteDisplay }
    </main>
  );
}

export default noteContainer;