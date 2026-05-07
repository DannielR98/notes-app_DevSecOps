import { useState } from "react";

function NoteForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] =
    useState("");

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");

      return;
    }

    setError("");

    await onCreate({
      title,
      content,
    });

    setTitle("");
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      <button type="submit">
        Add Note
      </button>

      {error && (
        <p className="error">{error}</p>
      )}
    </form>
  );
}

export default NoteForm;