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
const { findAllNotes, findNoteById } = await import('../services/notes.service.js');
const { default: mockDb } = await import('../db/db.js');

describe('Notes Service', () => {
  beforeEach(() => {
    // Reset mock state
    mockDb.data.notes = [];
    jest.clearAllMocks();
  });

  it('should return all notes', async () => {
    mockDb.data.notes = [{ id: 1, title: 'Test' }];
    const result = await findAllNotes();
    expect(result).toHaveLength(1);
    expect(mockDb.read).toHaveBeenCalled();
  });
});