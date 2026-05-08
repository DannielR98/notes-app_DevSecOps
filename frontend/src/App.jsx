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
  const [editingNote, setEditingNote] = useState(null);

  async function loadNotes() {
    try {
      const data = await getNotes();

      setNotes(data);
    } catch {
      setError("Failed to load notes");
    }
  }

  useEffect(() => {
  async function fetchData() {
    await loadNotes();
  }

  fetchData();
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

  function handleEdit(note) {
    setEditingNote(note);
  }

  async function handleSaveEdit(updatedFields) {
    try {
      const saved = await updateNote(
        editingNote.id,
        updatedFields
      );

      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id ? saved : n
        )
      );

      setEditingNote(null);
    } catch {
      setError("Failed to save note");
    }
  }

  function handleCancelEdit() {
    setEditingNote(null);
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
        onEdit={handleEdit}
      />

      {editingNote && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Note</h2>
            <NoteForm
              initialNote={editingNote}
              onEdit={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;