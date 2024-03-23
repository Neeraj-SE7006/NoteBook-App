import React, { useState } from 'react';

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote({
      title,
      description
    });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Note Title</label>
        <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor='description'>Note Description</label>
        <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default NoteForm;
