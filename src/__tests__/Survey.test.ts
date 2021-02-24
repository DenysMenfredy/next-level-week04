import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post('/surveys').send({
            title: "This is a survey of example for tests purpose",
            description: "Sample description",
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to get all surveys", async () => {
        await request(app).post('/surveys').send({
            title: "This is a survey of example for tests purpose",
            description: "Sample description",
        });

        const response = await request(app).get('/surveys');

        expect(response.body.length).toBe(2);
    })

});