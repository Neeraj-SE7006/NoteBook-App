import React, { useState, useEffect, useContext, useCallback } from 'react';
import Modal from './components/Modal';
import SearchBar from './components/SearchBar';
import Notes from './components/Notes';
import NoteForm from './components/NoteForm';
import { NoteContext } from './context/NoteContext';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const { notes, setNotes, searchQuery, setSearchQuery } = useContext(NoteContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalNotes, setTotalNotes] = useState(0);
  const [showingNotes, setShowingNotes] = useState(0);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://notes-f8b13-default-rtdb.asia-southeast1.firebasedatabase.app/notes.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedNotes = [];

      for (const key in data) {
        loadedNotes.push({
          id: key,
          title: data[key].title,
          description: data[key].description,
        });
      }

      setNotes(loadedNotes);
      setTotalNotes(loadedNotes.length);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [setNotes]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    setShowingNotes(notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase())).length);
  }, [notes, searchQuery]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddNote = async (note) => {
    try {
      const response = await fetch('https://notes-f8b13-default-rtdb.asia-southeast1.firebasedatabase.app/notes.json', {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to add note.');
      }

      const data = await response.json();
      setNotes(prevNotes => [
        ...prevNotes,
        {
          id: data.name,
          ...note
        }
      ]);
      setTotalNotes(totalNotes + 1);
      handleCloseModal();
      alert('Note Added!!');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch(`https://notes-f8b13-default-rtdb.asia-southeast1.firebasedatabase.app/notes/${id}.json`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note.');
      }

      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      setTotalNotes(totalNotes - 1);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  let content = <p>No notes found.</p>;
  if (notes.length > 0) {
    content = <Notes notes={notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()))} onDelete={handleDeleteNote} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className="App">
      <h1>Notes Book</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      <div className="stats">
        <p>Total Notes: {totalNotes}</p>
        <p>Showing Notes: {showingNotes}</p>
      </div>
      <button onClick={() => setShowModal(true)}>Add New Note</button>
      {showModal && (
        <Modal handleClose={handleCloseModal}>
          <NoteForm addNote={handleAddNote} />
        </Modal>
      )}
      {content}
    </div>
  );
}

export default App;
