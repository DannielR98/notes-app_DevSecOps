import {
  findAllNotes,
  findNoteById,
  addNote,
  editNote,
  removeNote,
} from "../services/notes.service.js";

export async function getAllNotes(req, res) {
  const notes = await findAllNotes();

  res.json(notes);
}

export async function getNoteById(req, res) {
  const note = await findNoteById(req.params.id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  res.json(note);
}

export async function createNote(req, res) {
  const { title, content } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required",
    });

    if (content && content.trim() === "") {
      return res.status(400).json({
        message: "Content cannot be empty",
      });
    }
  }

  const newNote = await addNote({
    title,
    content,
  });

  res.status(201).json(newNote);
}

export async function updateNote(req, res) {
  const updatedNote = await editNote(
    req.params.id,
    req.body
  );

  if (!updatedNote) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  res.json(updatedNote);
}

export async function deleteNote(req, res) {
  const deleted = await removeNote(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  res.status(204).send();
}