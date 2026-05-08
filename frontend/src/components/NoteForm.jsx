import { useState, useEffect } from "react";

function NoteForm({ onCreate, onEdit, onCancel, initialNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] =
    useState("");

  const [error, setError] = useState("");
  const isEditMode = !!initialNote;

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content || "");
    }
  }, [initialNote]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");

      return;
    }

    setError("");

    if (isEditMode) {
      await onEdit({
        title,
        content,
      });
    } else {
      await onCreate({
        title,
        content,
      });
      setTitle("");
      setContent("");
    }
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

      <div className="form-buttons">
        <button type="submit">
          {isEditMode ? "Save Changes" : "Add Note"}
        </button>
        {isEditMode && (
          <button
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>

      {error && (
        <p className="error">{error}</p>
      )}
    </form>
  );
}

export default NoteForm;