import React, { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

const SearchBar = () => {
  const { setSearchQuery } = useContext(NoteContext);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input type="text" placeholder="Search notes..." onChange={handleSearch} />
  );
};

export default SearchBar;
