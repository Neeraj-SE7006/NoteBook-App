import React, { createContext, useState } from 'react';

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <NoteContext.Provider value={{ notes, setNotes, searchQuery, setSearchQuery }}>
      {children}
    </NoteContext.Provider>
  );
};
