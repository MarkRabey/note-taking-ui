import React, { useState } from 'react';
import s from './App.module.css';

import { NoteList } from './components/NoteList';
import { Editor } from './components/Editor';

function App() {
  const [ activeNoteId, setActiveNoteId ] = useState(null);

  const selectNote = (_id) => setActiveNoteId(_id);

  return (
    <div className={ s.app }>
      <NoteList
        onSelectNote={ selectNote }
        activeNoteId={ activeNoteId }
      />
      <Editor activeNoteId={ activeNoteId } />
    </div>
  );
}

export default App;
