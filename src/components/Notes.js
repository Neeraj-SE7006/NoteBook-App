import React from 'react';
import Note from './Note';

const Notes = ({ notes, onDelete }) => {
  return (
    <div>
      {notes.map(note => (
        <Note key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default Notes;
