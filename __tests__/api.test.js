const request = require('supertest');
const baseURL = 'http://www.cinemaguesser.xyz/api';

// Testing /login endopint
describe('POST /login', () => {
    // Testing on static dummy user
    const testUserRequest = {
        login: 'UnitTestUser',
        password: 'qwerty123*'
    };

    const testUserResponse = {
        firstName : 'StaticUser',
        lastName : 'ForTesting',
        error : ''
    };

    afterAll(async () => {
        await request(baseURL).delete('/login');
    });

    test('/login endpoint verifying test user request', async () => {
        const res = await request(baseURL).post('/login').send(testUserRequest);
        expect(res.statusCode).toBe(200);
        expect(res.body.fn).toBe(testUserResponse.fn);
        expect(res.body.ln).toBe(testUserResponse.ln);
    });

    // Tests with invalid user and password
    const badRequest = {
        login: '7ndy43ct79-08nahwuilrnmhc908um54hsd9',
        password: 'n1ybd07thrsartcre45tv61scrdcgh8y9'
    }

    test('/login endpoint with bad request', async () => {
        const res = await request(baseURL).post('/login').send(badRequest);
        expect(res.statusCode).toBe(200);
        expect(res._body.error).toBe('Login/Password incorrect');
    });
});