import { AuthenticatedRequest } from "@/middlewares";
import vacancyService from "@/services/vacancy-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getVacancyByActivityId(req: AuthenticatedRequest, res: Response) {
  const { activityId } = req.body;

  try {
    const booked = await vacancyService.findVacancyByActivityId(activityId);

    return res.status(httpStatus.OK).send(booked);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
};

export async function postVacancy(req: AuthenticatedRequest, res: Response) {
  const { activityId, ticketId } = req.body;

  try {
    await vacancyService.postVacancy(activityId, ticketId);

    return res.status(200).send("Tudo certo!");
  } catch (e) {
    console.log(e);
    return res.sendStatus(404);
  }
};
