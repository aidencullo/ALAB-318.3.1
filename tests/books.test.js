const request = require('supertest');
const app = require('../src/app');

describe('Books API', () => {
  it('should get all books', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('should create a new book', async () => {
    const newBook = {
      title: 'New Book',
      authorId: 2,
      publisherId: 2,
      publishedDate: '2024-01-01',
      genre: 'Non-Fiction'
    };

    const response = await request(app)
	  .post('/books')
	  .send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newBook.title);
    expect(response.body.authorId).toBe(newBook.authorId);
    expect(response.body.publisherId).toBe(newBook.publisherId);
    expect(response.body.publishedDate).toBe(newBook.publishedDate);
    expect(response.body.genre).toBe(newBook.genre);
  });

  it('should get a book by ID', async () => {
    const bookId = 1;

    const response = await request(app).get(`/books/${bookId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', bookId);
    expect(response.body).toHaveProperty('title');
  });

  it('should update a book by ID with the full object', async () => {
    const updatedBook = {
      id: 1,
      title: 'Updated Book Title',
      authorId: 1,
      publisherId: 1,
      publishedDate: '2024-01-01',
      genre: 'Updated Genre'
    };

    const response = await request(app)
	  .put('/books/1')
	  .send(updatedBook);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedBook);
  });

  it('should partially update a book by ID', async () => {
    const partialUpdate = {
      title: 'Partially Updated Title'
    };

    const response = await request(app)
	  .patch('/books/1')
	  .send(partialUpdate);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body.title).toBe(partialUpdate.title);
  });

  it('should delete a book by ID', async () => {
    // First, create a book to delete
    const newBook = {
      title: 'Book to Delete',
      authorId: 2,
      publisherId: 2,
      publishedDate: '2024-01-01',
      genre: 'Non-Fiction'
    };

    const createResponse = await request(app)
	  .post('/books')
	  .send(newBook);
    
    const bookId = createResponse.body.id; // Get the ID of the created book

    // Delete the book
    const deleteResponse = await request(app)
	  .delete(`/books/${bookId}`);

    expect(deleteResponse.status).toBe(204);
    expect(deleteResponse.body).toEqual({}); // Ensure response body is empty

    // Verify that the book was actually deleted
    const getResponse = await request(app).get(`/books/${bookId}`);
    expect(getResponse.status).toBe(404);
    expect(getResponse.text).toBe('Book not found');
  });

  it('should return 404 when deleting a non-existent book ID', async () => {
    const response = await request(app)
	  .delete('/books/999');
    
    expect(response.status).toBe(404);
    expect(response.text).toBe('Book not found');
  });

  it('should return 404 for a non-existent book ID', async () => {
    const response = await request(app).get('/books/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Book not found');
  });

  it('should return 404 when updating a non-existent book ID', async () => {
    const updatedBook = {
      title: 'Updated Title'
    };

    const response = await request(app)
	  .put('/books/999')
	  .send(updatedBook);

    expect(response.status).toBe(404);
    expect(response.text).toBe('Book not found');
  });
  
  it('should filter books by genre', async () => {
    const newBook = {
      title: 'New Book',
      authorId: 2,
      publisherId: 2,
      publishedDate: '2024-01-01',
      genre: 'Fantasy'
    };

    await request(app)
      .post('/books')
      .send(newBook);

    const genre = 'Fantasy';

    const response = await request(app).get(`/books?genre=${genre}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    
    expect(response.body.length).toBeGreaterThanOrEqual(1);

    const filteredBooks = response.body;
    filteredBooks.forEach(book => {
      expect(book.genre).toBe(genre);
    });
  });
});
