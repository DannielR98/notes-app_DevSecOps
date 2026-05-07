import axios from "axios";

const API_URL = "http://localhost:3001/notes";

export async function getNotes() {
  const response = await axios.get(API_URL);

  return response.data;
}

export async function createNote(note) {
  const response = await axios.post(API_URL, note);

  return response.data;
}

export async function deleteNote(id) {
  await axios.delete(`${API_URL}/${id}`);
}

export async function updateNote(id, updatedNote) {
  const response = await axios.put(
    `${API_URL}/${id}`,
    updatedNote
  );

  return response.data;
}