require('mongodb');

const request = require('supertest');
var sha256 = require('js-sha256');

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
        login: 'UnitTestUser',
        password: 'notthepassword'
    }

    test('/login endpoint with bad request', async () => {
        const res = await request(baseURL).post('/login').send(badRequest);

        expect(res.statusCode).toBe(200);
        expect(res._body.error).toBe('Login/Password incorrect');
    });
});

// Testing /register endpoint
describe('POST /register', () => {
    // Unused for time being
    let client;
    let db;

    const registerTest = {
        FirstName: 'Register',
        LastName: 'UnitTest',
        Login: 'RegisterUnitTest',
        Password: sha256.hmac('key', 'test'),
        Score: 0,
        GamesPlayed: 0,
        WatchList: []
    };
    
    /* Should connect to mongodb but doesn't...
    beforeAll(async () => {
        const MongoClient = require('mongodb').MongoClient;
        require('dotenv').config();

        client = new MongoClient(process.env.MONGODB_URI);
        client.connect();

        db = client.db();
    });
    */

    // Remove user and verify it has been removed.
    // Not working because can't connect to mongodb.
    /*
    afterAll(async () => {
        await request(baseURL).delete('/register');

        db.collection('Users').deleteOne({Login:registerTest.Login});

        test('Test user is removed from data base after test', async () => {
            const res = await db.collection('Users').find({Login:registerTest.Login}).toArray();
            expect(res).toEqual([]);
        });
    });
    */

    // Registers dummy user, needs to be manually removed from db for now.
    test('/register endpoint adding dummy user', async () => {
        const res = await request(baseURL).post('/register').send(registerTest);

        expect(res.statusCode).toBe(200);
    });
}); 