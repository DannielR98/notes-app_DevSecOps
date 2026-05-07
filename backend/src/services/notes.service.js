import db from "../db/db.js";

export async function findAllNotes() {
  await db.read();

  return db.data.notes;
}

export async function findNoteById(id) {
  await db.read();

  return db.data.notes.find(
    (note) => note.id === Number(id)
  );
}

export async function addNote(noteData) {
  await db.read();

  const newNote = {
    id: Date.now(),
    title: noteData.title,
    content: noteData.content || "",
    createdAt: new Date().toISOString(),
  };

  db.data.notes.push(newNote);

  await db.write();

  return newNote;
}

export async function editNote(id, updatedData) {
  await db.read();

  const note = db.data.notes.find(
    (note) => note.id === Number(id)
  );

  if (!note) {
    return null;
  }

  note.title = updatedData.title || note.title;
  note.content = updatedData.content || note.content;

  await db.write();

  return note;
}

export async function removeNote(id) {
  await db.read();

  const index = db.data.notes.findIndex(
    (note) => note.id === Number(id)
  );

  if (index === -1) {
    return false;
  }

  db.data.notes.splice(index, 1);

  await db.write();

  return true;
}