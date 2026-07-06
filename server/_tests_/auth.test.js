const request = require('supertest');
const app = require('../app');

describe('Auth endpoints', () => {
  it('rejects login with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('rejects access to protected route without a token', async () => {
    const res = await request(app).get('/api/posts');

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('No token provided');
  });

  it('returns a token on successful login', async () => {
    const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'secret123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('username', 'TestHunter');
    });

  it('allows access to posts with a valid token', async () => {
    // first log in to get a token
    const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'secret123' });
    const token = loginRes.body.token;

    const res = await request(app)
        .get('/api/posts')
        .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
});
});