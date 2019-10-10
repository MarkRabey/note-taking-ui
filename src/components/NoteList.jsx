import React, { useState, useEffect } from 'react';
import s from '../styles/NoteList.module.css';
import { Header } from './Header';
import cx from 'classnames';
import axios from 'axios';

export const NoteList = props => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (notes.length === 0) {
      const notesQuery = `
        query AllNotes {
          allNotes {
            _id
            title
          }
        }
      `;
      
      axios({
        url: 'http://localhost:4300/graphql',
        method: 'POST',
        data: {
          query: notesQuery,
        }
      }).then(({ data }) => data).then(({ data }) => {
        setNotes(data.allNotes);
      }).catch(e => console.log(e));
    }
  });
  
  return (
    <div className={ s.container }>
      <Header title="Notes" />
      <ul className={ s['note-list'] }>
        {
          notes.map(note => (
            <li key={ note._id } className={cx({
              [s.note]: true,
              [s['note--active']]: note._id === props.activeNoteId,
            })}>
              <a href="/" className={ s['note__link'] } onClick={ (e) => {
                e.preventDefault();
                props.onSelectNote(note._id);
              }}>
                { note.title }
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  );
}