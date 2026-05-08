import { jest } from '@jest/globals';

// 1. Use the full filename including .js extension
jest.unstable_mockModule('../db/db.js', () => ({
  default: {
    read: jest.fn(),
    write: jest.fn(),
    data: { notes: [] },
  }
}));

// 2. Use dynamic imports AFTER the mock is defined
  const { findAllNotes, findNoteById, addNote, editNote, removeNote } 
  = await import('../services/notes.service.js');
  const { default: mockDb } = await import('../db/db.js');

describe('Notes Service', () => {
  beforeEach(() => {
    // Reset mock state
    mockDb.data.notes = [];
    jest.clearAllMocks();
  });

  //1. Test for findAllNotes
  it('should return all notes', async () => {
    mockDb.data.notes = [{ id: 1, title: 'Test' }];
    const result = await findAllNotes();
    expect(result).toHaveLength(1);
    expect(mockDb.read).toHaveBeenCalled();
  });

  //2. Test for findNoteById
  it('should return a note by its ID', async () => {
    mockDb.data.notes = [{ id: 1, title: 'Test Note' }];
    const result = await findNoteById(1);
    expect(result).toEqual({ id: 1, title: 'Test Note' });
  });

  //3. Test for findNoteById with non-existent ID
  it('should return undefined for non-existent ID', async () => {
    mockDb.data.notes = [{ id: 1, title: 'Test Note' }];
    const result = await findNoteById(999);
    expect(result).toBeUndefined();
  });

  //4. Test for addNote
  it('should create a new note', async () => {
    const newNote = { title: 'New Note', content: 'Content here' };
    const result = await addNote(newNote);
    expect(result.title).toBe('New Note');
    expect(result.content).toBe('Content here');
    expect(mockDb.write).toHaveBeenCalled();
  });

  //5. Test for editNote
  it('should edit an existing note', async () => {
    mockDb.data.notes = [{ id: 1, title: 'Old Title', content: 'Old Content' }];
    const updatedNote = { title: 'Updated Title', content: 'Updated Content' };
    const result = await editNote(1, updatedNote);
    expect(result.title).toBe('Updated Title');
    expect(result.content).toBe('Updated Content');
  });

  //6. Test for removeNote
  it('should delete a note and return true', async () => {
  mockDb.data.notes = [{ id: 1, title: 'To Delete' }];
  const result = await removeNote(1);
  expect(result).toBe(true);
  expect(mockDb.data.notes).toHaveLength(0);
  expect(mockDb.write).toHaveBeenCalled();
});


});