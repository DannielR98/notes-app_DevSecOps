function NoteItem({
  note,
  onDelete,
  onEdit,
}) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <button
        onClick={() =>
          onEdit(note)
        }
      >
        Edit
      </button>

      <button
        onClick={() =>
          onDelete(note.id)
        }
      >
        Delete
      </button>
    </div>
  );
}

export default NoteItem;