const request = require("supertest");
const app = require("../app");

describe('users endpoints without authentification', () => {
  const usersRoot = "/users"

  test('/whoami', async () => {
    const response = await request(app)
      .get(`${usersRoot}/whoami`)

    expect(response.status).toBe(401);
    expect(response.type).toBe('application/json');
  })

  test('/matches', async () => {
    const response = await request(app)
      .get(`${usersRoot}/matches`)

    expect(response.status).toBe(401);
    expect(response.type).toBe('application/json');
  })
})
