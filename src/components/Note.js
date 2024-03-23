import React from 'react';

const Note = ({ note, onDelete }) => {
  const handleDelete = () => {
    onDelete(note.id);
  };

  return (
    <div className="note">
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Note;
