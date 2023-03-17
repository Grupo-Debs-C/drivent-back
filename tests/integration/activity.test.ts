import app, { init } from "@/app";
import faker from "@faker-js/faker";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import {
  createActivity,
  createEvent2,
  createLocality,
  createUser
} from "../factories";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /activities/all", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/activities/all");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/activities/all").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/activities/all").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 when activities dont exist", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get("/activities/all").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
      expect(response.body).toEqual([]);
    });

    it("should respond with status 200 and list of activities when activities exist ", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const event = await createEvent2();
      const locality = await createLocality();
      const locality2 = await createLocality();

      const activity = await createActivity(event.id, locality.id);
      const activity2 = await createActivity(event.id, locality2.id);

      const response = await server.get("/activities/all").set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([{
        id: activity.id,
        eventId: event.id,
        localityId: locality.id,
        Name: activity.Name,
        endsAt: activity.endsAt.toISOString(),
        startAt: activity.startAt.toISOString(),
        vacancyLimit: activity.vacancyLimit      
      },
      {
        id: activity2.id,
        eventId: event.id,
        localityId: locality2.id,
        Name: activity2.Name,
        endsAt: activity2.endsAt.toISOString(),
        startAt: activity2.startAt.toISOString(),
        vacancyLimit: activity2.vacancyLimit      
      }
    ]);
    });
  });
});