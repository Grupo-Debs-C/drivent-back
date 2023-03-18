import app, { init } from "@/app";
import faker from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import {
  createActivity,
  createEnrollmentWithAddress,
  createEvent2,
  createLocality,
  createPayment,
  createTicket,
  createTicketTypeWithHotel,
  createUser
} from "../factories";
import { createVacancy } from "../factories/vacancy-factory";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /vacancy", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/vacancy");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/vacancy").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/vacancy").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and vacancy with correct body", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const event = await createEvent2();
      const locality = await createLocality();
      const activity = await createActivity(event.id, locality.id);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);
      const vacancy = await createVacancy(ticket.id, activity.id)

      const response = await server.get("/vacancy").set("Authorization", `Bearer ${token}`).send({activityId: activity.id});

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual({booked: 1});
    });
  });
});