const request = require('supertest');
const app = require('../src/app');

describe('Authors API', () => {
  it('should get all authors', async () => {
    const response = await request(app).get('/authors');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('should create a new author', async () => {
    const newAuthor = {
      name: 'New Author',
      birthdate: '1970-01-01',
      nationality: 'Unknown'
    };

    const response = await request(app)
      .post('/authors')
      .send(newAuthor);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newAuthor.name);
    expect(response.body.birthdate).toBe(newAuthor.birthdate);
    expect(response.body.nationality).toBe(newAuthor.nationality);
  });

  it('should get an author by ID', async () => {
    const authorId = 1;

    const response = await request(app).get(`/authors/${authorId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', authorId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('birthdate');
    expect(response.body).toHaveProperty('nationality');
  });

  it('should update an author by ID with the full object', async () => {
    const updatedAuthor = {
      id: 1,
      name: 'Updated Author Name',
      birthdate: '1980-01-01',
      nationality: 'Updated Nationality'
    };

    const response = await request(app)
      .put(`/authors/${updatedAuthor.id}`)
      .send(updatedAuthor);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedAuthor);
  });

  it('should return 404 for a non-existent author ID', async () => {
    const response = await request(app).get('/authors/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Author not found');
  });

  it('should return 404 when updating a non-existent author ID', async () => {
    const updatedAuthor = {
      name: 'Updated Name',
      birthdate: '1980-01-01',
      nationality: 'Updated Nationality'
    };

    const response = await request(app)
      .put('/authors/999')
      .send(updatedAuthor);

    expect(response.status).toBe(404);
    expect(response.text).toBe('Author not found');
  });
});
