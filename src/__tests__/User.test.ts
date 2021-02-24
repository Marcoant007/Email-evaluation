import request from 'supertest';
import { createConnection } from 'typeorm';
import { app } from '../app';

describe("User", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations();
    })
    it("Deve criar um novo usuário", async() => {

        const response = await request(app).post("/users").send({
            email: "userdoexemplo@gmail.com",
            name: "UserExample"
        });

        expect(response.status).toBe(201)
    });

    it("Não pode criar um novo usuário se o email ja existir",  async() => {

        const response = await request(app).post("/users").send({
            email: "userdoexemplo@gmail.com",
            name: "UserExample"
        });

        expect(response.status).toBe(400)
    })


})