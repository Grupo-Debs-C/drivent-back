import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllActivities(req: AuthenticatedRequest, res: Response) {
  try {
    //const ticketTypes = await ticketService.getTicketTypes();

    //return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}