const { MongoClient } = require('mongodb');

const request = require('supertest');
var sha256 = require('js-sha256');

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
    //const nullRequest = {
    //    login: null,
    //    password: null
    //}

    //test('/login endpoint with null request', async () => {
    //    const res = await request(baseURL).post('/login').send(nullRequest);
    //
    //    expect(res.statusCode).toBe(200);
    //});
});

// Testing /register endpoint
describe('POST /register', () => {
    let client = require('../server');
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
    // Connect to db
    beforeAll(async () => {
        //require('dotenv').config();
        //client = new MongoClient(process.env.MONGODB_URI);
        
        client.connect();
        db = client.db();
    });
    
    // Close connection with db
    afterAll(async () => {
        await client.close();
    });

    // Registers dummy user
    test('/register endpoint adding dummy user', async () => {
        // Add via api
        const res = await request(baseURL).post('/register').send(registerTest);

        expect(res.statusCode).toBe(200);

        const data = res.body;
        expect(data.firstname).toBe(registerTest.FirstName);
        expect(data.lastname).toBe(registerTest.LastName);
        expect(data.login).toBe(registerTest.Login);
        
        
        // Manual addition
        let FirstName = registerTest.FirstName;
        let LastName = registerTest.LastName;
        let Login = registerTest.Login;
        let Password = registerTest.Password;
        let Score = 0; 
        let GamesPlayed = 0; 
        let WatchList = [];

        const Users = db.collection('Users');
        Users.insertOne({FirstName, LastName, Login, Password, Score, GamesPlayed, WatchList});
    });

    // Removes dummy user and verifies removal
    test('Test user is removed from data base after test', async () => {
        const Users = db.collection('Users');
        const user = await Users.find({Login:registerTest.Login}).toArray();
        console.log(user);

        const result = await Users.deleteOne({Login:registerTest.Login});
        // Checking for db acknowledgment
        expect(result.acknowledged).toBeTruthy();
        // Checking that record was deleted
        expect(result.deletedCount).toBeGreaterThan(0);
    });
});