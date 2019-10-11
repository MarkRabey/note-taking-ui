import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import s from '../styles/Editor.module.css';
import { Header } from './Header';
import apiService from '../services/apiService';

export const Editor = props => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState();

  useEffect(() => {
    if (props.activeNoteId) {
      const noteQuery = `
        query getNote {
          getNote(_id: "${ props.activeNoteId }") {
            title
            content
          }
        }
      `;

      apiService.query(noteQuery).then(({ getNote }) => {
        if (getNote) {
          setTitle(getNote.title);
          setContent(getNote.content);
        }
      });
    }
  }, [props.activeNoteId])

  const saveNote = (e) => {
    e.preventDefault();
    const noteMutation = `
      mutation {
        updateNote(_id: "${ props.activeNoteId }", input: { title: "${ title }", content: "${ content }" }) {
          _id
        }
      }
    `;
    
    apiService.query(noteMutation).then(() => {
      setMessage('Note saved!');
      setTimeout(() => setMessage(null), 3000);
    });
  }

  const handleContentChange = (e) => {
    setContent(e.target.value);
  }

  return (
    <div className={ cx({
      [s.container]: true,
      [s['container--active']]: props.activeNoteId ? true : false,
    }) }>
      <Header title={ title ? title : 'Untitled' } />

      <textarea value={ content } onChange={ handleContentChange }></textarea>

      <button onClick={ saveNote }>
        Save
      </button>

      {
        message &&
        <p>{ message }</p>
      }
    </div>
  );
}