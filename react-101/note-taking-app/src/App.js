import React, { Component } from 'react';
import './App.css';

import Sidebar from './Sidebar/Sidebar';
import Button from './Button/Button';
import Note from './Note/Note';
import NoteEdit from './NoteEdit/NoteEdit';

class App extends Component {
  state = {
    notes: [
      {
        id: 0,
        headline: 'My First Note',
        createdDate: '12/30/1989',
        createdTime: '08:15AM',
        updatedDate: '02/13/2012',
        updatedTime: '5:37PM',
        content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.']
      },
      {
        id: 1,
        headline: 'This One\'s Different',
        createdDate: '10/15/1999',
        createdTime: '2:59PM',
        updatedDate: '06/15/2016',
        updatedTime: '2:15AM',
        content: ['Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.', 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?']
      },
      {
        id: 2,
        headline: 'My Special Note',
        createdDate: '2/19/2019',
        createdTime: '9:41AM',
        updatedDate: '7/26/2019',
        updatedTime: '1:37PM',
        content: ['You might remember the Dell computer commercials in which a youth reports this exciting news to his friends that they are about to get their new computer by telling them, “Dude, you’re getting a Dell!” It was a cute series but it reflects the excitement young people get about anything new, particularly if it’s a new machine.', 'So when its time to finally get your children that very first telescope, you want to make sure it’s just the right thing. There are a number of reasons you should put some serious thought into just what this beginner telescope should look like. Perhaps this will be your children’s first experience with a real telescope. They may have a healthy and thriving love of astronomy from your family trips to the country to watch a meteor shower or just to gaze at the stars. And you may have piqued their interest showing them how to enhance the experience with binoculars or even letting them play with your telescope.']
      }
    ],
    activeNoteId: null,
    activeNote: {},
    noteIsEditable: false,
  }

  createNoteHandler = () => {
    if (Object.keys(this.state.activeNote).length > 0) {
      this.editNoteHandler(this.state.activeNote.id);
    }

    this.setState({ activeNote: {} });


    const d = new Date();
    const isEvening = d.getHours() > 12;
    const newNote = {
      id: this.state.notes[this.state.notes.length - 1].id + 1,
      headline: '',
      createdDate: `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`,
      createdTime: `${isEvening ? d.getHours() - 12 : d.getHours()}:${d.getMinutes()}${isEvening ? 'PM' : 'AM'}`,
      content: [],
    }
    const notes = [...this.state.notes];
    notes.push(newNote);

    this.setState({ notes: notes });
    this.setState({ activeNoteId: newNote.id });
    this.setState({ activeNote: newNote });
    this.setState({ noteIsEditable: true});
  }

  selectNoteHandler = (noteId) => {
    const noteIndex = this.state.notes.findIndex(note => {
      return note.id === noteId
    });
    const note = {
      ...this.state.notes[noteIndex]
    };

    this.setState({ activeNote: note })
    this.setState({ activeNoteId: noteId });
    this.setState({ noteIsEditable: false });
  }

  deleteNoteHandler = (noteId) => {
    const noteIndex = this.state.notes.findIndex(note => {
      return note.id === noteId
    });

    const notes = [...this.state.notes];
    notes.splice(noteIndex, 1);
    this.setState({ 
      notes: notes,
      activeNoteId: null,
      activeNote: {},
    });
  };

  editNoteHandler = (noteId) => {
    if (Object.values(this.state.activeNote).length === 0) return false;
    const activeNoteIndex = this.state.notes.findIndex(n => {
      return n.id === noteId
    });

    const noteIsEditable = this.state.noteIsEditable;
    if (noteIsEditable) {
      // update state note to match active note
      const activeNote = {...this.state.activeNote}
      

      const notes = [...this.state.notes]

      notes[activeNoteIndex] = activeNote;
      this.setState({ notes: notes });
    }
    return this.setState({ noteIsEditable: !noteIsEditable })
  }

  headlineChangedHandler(event) {
    const note = {...this.state.activeNote};

    note.headline = event.target.value;

    this.setState({ activeNote: note });
  }

  contentChangedHandler(event) {
    const note = {...this.state.activeNote};

    note.content = [event.target.value];

    this.setState({ activeNote: note });
  }

  render() {
    let noteDisplay = null
    if (!this.state.noteIsEditable) {
      noteDisplay = <Note isEditable={this.state.noteIsEditable} headline={this.state.activeNote.headline} content={this.state.activeNote.content} />
    } else if (Object.keys(this.state.activeNote).length > 0 && this.state.noteIsEditable) {
      noteDisplay = <NoteEdit headline={this.state.activeNote.headline} content={this.state.activeNote.content} headlineChanged={(event) => this.headlineChangedHandler(event, this.state.activeNote.id)} bodyChanged={(event) => this.contentChangedHandler(event, this.state.activeNote.id)}/>
    }

    return (
      <section className="layout">
        <Sidebar
          notes={this.state.notes}
          createNoteClick={() => this.createNoteHandler}
          activeNoteId={this.state.activeNoteId}
          selectNoteClick={(id) => this.selectNoteHandler(id)}/>
        <main>
          <header>
          <p className="body-text no-margin muted">Last Updated: {this.state.activeNote.createdTime} {this.state.activeNote.createdDate}</p>
          <div className="button-group">
            <Button
              classList='button primary header-text'
              display='primary'
              click={() => this.editNoteHandler(this.state.activeNote.id)}
              value='Edit Note' />
            <Button
              classList='button secondary header-text'
              display='secondary'
              click={() => this.deleteNoteHandler(this.state.activeNote.id)}
              value='Delete Note' />
          </div>
        </header>
        { noteDisplay }
        </main>
      </section>
    );
  }
}

export default App;
