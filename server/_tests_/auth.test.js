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
});