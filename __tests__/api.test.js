const { MongoClient } = require('mongodb');

const request = require('supertest');
var sha256 = require('js-sha256');
const { EmailAddress } = require('@sendgrid/helpers/classes');

const baseURL = 'http://localhost:5000/api';

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

    test('/login endpoint verifying test user request', async () => {
        const res = await request(baseURL).post('/login').send(testUserRequest);

        expect(res.statusCode).toBe(200);
        expect(res.body.fn).toBe(testUserResponse.fn);
        expect(res.body.ln).toBe(testUserResponse.ln);
    });

    // Tests with invalid user and password
    const badRequest0 = {
        login: 'UnitTestUser',
        password: 'notthepassword'
    }

    test('/login endpoint with bad request', async () => {
        const res = await request(baseURL).post('/login').send(badRequest0);

        expect(res.statusCode).toBe(200);
        expect(res.body.error).toBe('Login/Password incorrect');
    });

    // Tests with empty user and password
    const badRequest1 = {
        login: '',
        password: ''
    }

    test('/login endpoint with empty request', async () => {
        const res = await request(baseURL).post('/login').send(badRequest1);

        expect(res.statusCode).toBe(200);
        expect(res.body.error).toBe('ERROR: Empty field(s)');
    });

    // Tests with null user and password
    const nullRequest = {
       login: null,
       password: null
    }

    test('/login endpoint with null request', async () => {
       const res = await request(baseURL).post('/login').send(nullRequest);
    
       expect(res.statusCode).toBe(200);
    });
});

// Testing /register endpoint
describe('POST /register', () => {
    let client = require('../server');
    let db;

    const registerTest = {
        FirstName: 'Register',
        LastName: 'UnitTest',
        Login: 'RegisterUnitTest',
        Pass: sha256.hmac('key', 'test'),
        Email: 'registertest@email.com'
    };
    // Connect to db
    beforeAll(async () => {
        //require('dotenv').config();
        //client = new MongoClient(process.env.MONGODB_URI);

        db = client.db();
    });

    // Registers dummy user
    test('/register endpoint adding dummy user', async () => {
        const res = await request(baseURL).post('/register').send(registerTest);

        expect(res.statusCode).toBe(200);

        console.log(res);

        const data = res.body;
        expect(data.firstname).toBe(registerTest.FirstName);
        expect(data.lastname).toBe(registerTest.LastName);
        expect(data.login).toBe(registerTest.Login);
        expect(data.email).toBe(registerTest.Email);
    });

    // Removes dummy user and verifies removal
    // test('Test user is removed from data base after test', async () => {
    //     const Users = db.collection('Users');
    //     const user = await Users.find({Login:registerTest.Login,Password:registerTest.Pass}).toArray();
    //     console.log(user);

    //     const result = await Users.deleteOne({Login:registerTest.Login,Password:registerTest.Pass});
    //     // Checking for db acknowledgment
    //     expect(result.acknowledged).toBeTruthy();
    //     // Checking that record was deleted
    //     expect(result.deletedCount).toBeGreaterThan(0);
    // });
});