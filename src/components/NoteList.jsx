import React, { useState, useEffect } from 'react';
import s from '../styles/NoteList.module.css';
import { Header } from './Header';
import cx from 'classnames';
import apiService from '../services/apiService';

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
      apiService.query(notesQuery).then(data => {
        if (data.allNotes) {
          setNotes(data.allNotes);
        }
      });
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