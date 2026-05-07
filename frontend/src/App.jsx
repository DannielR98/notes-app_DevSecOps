import { useEffect, useState } from "react";

import "./App.css";

import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from "./services/notesApi";

import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  async function loadNotes() {
    try {
      const data = await getNotes();

      setNotes(data);
    } catch {
      setError("Failed to load notes");
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleCreateNote(note) {
    try {
      const created = await createNote(note);

      setNotes((prev) => [...prev, created]);
    } catch {
      setError("Failed to create note");
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmed) return;

    await deleteNote(id);

    setNotes((prev) =>
      prev.filter((note) => note.id !== id)
    );
  }

  async function handleToggleEdit(note) {
    const updated = {
      ...note,
      title: note.title + " (updated)",
    };

    const saved = await updateNote(
      note.id,
      updated
    );

    setNotes((prev) =>
      prev.map((n) =>
        n.id === note.id ? saved : n
      )
    );
  }

  return (
    <div className="container">
      <h1>Notes App</h1>

      {error && (
        <p className="error">{error}</p>
      )}

      <NoteForm onCreate={handleCreateNote} />

      <NoteList
        notes={notes}
        onDelete={handleDelete}
        onEdit={handleToggleEdit}
      />
    </div>
  );
}

export default App;