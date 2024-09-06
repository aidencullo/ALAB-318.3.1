const request = require('supertest');
const app = require('../src/app');

describe('Publishers API', () => {
  it('should get all publishers', async () => {
    const response = await request(app).get('/publishers');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(0);
  });

  it('should create a new publisher', async () => {
    const newPublisher = {
      name: 'New Publisher',
      location: 'Berlin, Germany'
    };

    const response = await request(app)
      .post('/publishers')
      .send(newPublisher);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newPublisher.name);
    expect(response.body.location).toBe(newPublisher.location);
  });

  it('should get a publisher by ID', async () => {
    const publisherId = 1;

    const response = await request(app).get(`/publishers/${publisherId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', publisherId);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('location');
  });

  it('should update a publisher by ID with the full object', async () => {
    const updatedPublisher = {
      id: 1,
      name: 'Updated Publisher Name',
      location: 'San Francisco, USA'
    };

    const response = await request(app)
      .put(`/publishers/${updatedPublisher.id}`)
      .send(updatedPublisher);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedPublisher);
  });

  it('should return 404 for a non-existent publisher ID', async () => {
    const response = await request(app).get('/publishers/999');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Publisher not found');
  });

  it('should return 404 when updating a non-existent publisher ID', async () => {
    const updatedPublisher = {
      name: 'Updated Name',
      location: 'Unknown'
    };

    const response = await request(app)
      .put('/publishers/999')
      .send(updatedPublisher);

    expect(response.status).toBe(404);
    expect(response.text).toBe('Publisher not found');
  });
});
