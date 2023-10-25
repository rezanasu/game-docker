const app = require("../app.js")
const request = require('supertest');
const {sequelize} = require("../models");
const {queryInterface} = sequelize;


// CODE SEBELUM TESTING
// ==> BULK INSERT / POPULATE DATA

beforeAll((done) => {

    queryInterface.bulkInsert("Games", [
        {
            id: 9999991,
            title: "Spiderman 2",
            developer: "Insomniac Games",
            platform: "PS5",
            year: 2023,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 9999992,
            title: "God of War Ragnarok",
            developer: "Santa Monica Studio",
            platform: "PS5; PS4",
            year: 2022,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 9999993,
            title: "Tekken 7",
            developer: "Bandai Namco",
            platform: "PS4",
            year: 2017,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {})
    .then(_ => {
        done()
    })
    .catch(err => {
        done(err)
    }) 
})


// CODE SETELAH TESTING SELESAI
// CLEANING DATABASE / HAPUS SEMUA DATA DI TABLE GAMES

afterAll((done) => {

    queryInterface.bulkDelete("Games", null, {})
        .then(_ => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

// UNIT TESTING / TEST DRIVEN DEVELOPMENT
// TEST SETIAP ENDPOINT YANG DIBUAT

describe("GET /games", () => {

    it("Get list games", (done) => {
        
        request(app)
            .get("/games")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {data} = res.body;
                expect(data.length).toBe(3)
                const firstData = data[0]

                expect(firstData.title).toEqual("Spiderman 2")
                expect(firstData.id).toEqual(9999991)
                expect(firstData.year).toEqual(2023)
                done();
            })
            .catch(err => {
                done(err);
            })
            
    })
})

describe("GET /games/:id", () => {

    it("Get Game Detail", (done) => {
        
        request(app)
            .get(`/games/${9999992}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {data} = res.body;
                expect(data.id).toEqual(9999992)
                expect(data.title).toEqual("God of War Ragnarok")
                expect(data.platform).toEqual("PS5; PS4")
                expect(data.year).toEqual(2022)
                done();
            })
            .catch(err => {
                done(err);
            })
    })

    it("Error Not Found", (done) => {

        request(app)
            .get(`/games/${6666}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                const {message} = res.body;

                expect(message).toEqual("Error Not Found")
                done();
            })
            .catch(err => {
                done(err);
            })
    })
})

describe("POST /games", () => {

    it("Create game successfully", (done) => {

        request(app)
            .post("/games")
            .send({
                title: "Sekiro",
                developer: "FromSoftware Inc.",
                platform: "PC; PS4",
                year: 2019
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((res) => {
                const {message, data} = res.body;

                expect(message).toEqual("New Game created successfully")
                expect(data.title).toEqual("Sekiro")
                expect(data.developer).toEqual("FromSoftware Inc.")
                expect(data.platform).toEqual("PC; PS4")
                expect(data.year).toEqual(2019)
                done();
            })
            .catch(err => {
                done(err)
            })
    })

    it("Validation Error", (done) => {
        request(app)
            .post("/games")
            .send({
                developer: "FromSoftware Inc.",
                platform: "PC; PS4",
                year: 2019
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {

                const {name, message} = res.body;

                expect(name).toBe("SequelizeValidationError")
                expect(message).toEqual("notNull Violation: Game.title cannot be null")
                done();
            })
            .catch(err => {
                done(err)
            })
    })


})


describe("PUT /games/:id", () => {

    it("Game updated successfully", (done) => {
        request(app)
            .put(`/games/${9999993}`)
            .send({
                title: "Tekken 8",
                year: 2023,
                platform: "PS5"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {message, data} = res.body;

                expect(message).toEqual("Game updated successfully")
                expect(data.title).toBe("Tekken 8")
                expect(data.year).toBe(2023)
                expect(data.platform).toBe("PS5")
                done();
            })
            .catch(err => {
                done(err)
            })
    })
})

describe("DELETE /games/:id", () => {

    it("Game deleted successfully", (done) => {
        request(app)
            .delete(`/games/${9999992}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {message} = res.body;

                expect(message).toEqual("Game deleted successfully")
                done();
            })
            .catch(err => {
                done(err);
            }) 
    })
})

