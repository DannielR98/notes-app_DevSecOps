import request from 'supertest';
import { jest } from '@jest/globals';

// Mocka databasen innan vi importerar appen
jest.unstable_mockModule('../../db/db.js', () => ({
  default: {
    read: jest.fn(),
    write: jest.fn(),
    data: { notes: [] },
  }
}));

const { default: mockDb } = await import('../../db/db.js');
const { default: app } = await import('../../server.js');

describe('Notes API', () => {
  beforeEach(() => {
    mockDb.data.notes = [];
    jest.clearAllMocks();
  });

  // TEST 1: GET alla notes
  it('GET /notes returns all notes', async () => {
    mockDb.data.notes = [
      { id: 1, title: 'Note 1', content: 'Content 1' },
      { id: 2, title: 'Note 2', content: 'Content 2' }
    ];

    const response = await request(app).get('/notes');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  // TEST 2: GET en specifik note
  it('GET /notes/:id returns a single note', async () => {
    mockDb.data.notes = [
      { id: 1, title: 'Note 1', content: 'Content 1' }
    ];

    const response = await request(app).get('/notes/1');

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Note 1');
  });

  // TEST 3: GET note med ogiltigt ID (404)
  it('GET /notes/:id returns 404 for non-existent note', async () => {
    mockDb.data.notes = [
      { id: 1, title: 'Note 1', content: 'Content 1' }
    ];

    const response = await request(app).get('/notes/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Note not found');
  });

  // TEST 4: POST skapa ny note (lyckat)
  it('POST /notes creates a new note', async () => {
    const newNote = { title: 'New Note', content: 'New Content' };

    const response = await request(app)
      .post('/notes')
      .send(newNote);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('New Note');
    expect(response.body.content).toBe('New Content');
  });

  // TEST 5: POST med tom title (validering/400)
  it('POST /notes returns 400 for empty title', async () => {
    const invalidNote = { title: '', content: 'Content' };

    const response = await request(app)
      .post('/notes')
      .send(invalidNote);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Title is required');
  });

  // TEST 6: PUT uppdatera note
  it('PUT /notes/:id updates an existing note', async () => {
    mockDb.data.notes = [
      { id: 1, title: 'Old Title', content: 'Old Content' }
    ];

    const updatedNote = { title: 'Updated Title', content: 'Updated Content' };

    const response = await request(app)
      .put('/notes/1')
      .send(updatedNote);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Title');
  });

  // TEST 7: DELETE radera note
  it('DELETE /notes/:id deletes a note', async () => {
    mockDb.data.notes = [
      { id: 1, title: 'To Delete', content: 'Content' }
    ];

    const response = await request(app).delete('/notes/1');

    expect(response.status).toBe(204);
    expect(mockDb.data.notes).toHaveLength(0);
  });

  // TEST 8: DELETE med ogiltigt ID (404)
  it('DELETE /notes/:id returns 404 for non-existent note', async () => {
    mockDb.data.notes = [
      { id: 1, title: 'Note 1', content: 'Content 1' }
    ];

    const response = await request(app).delete('/notes/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Note not found');
  });
});
