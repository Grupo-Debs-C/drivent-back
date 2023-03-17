import { AuthenticatedRequest } from "@/middlewares";
import activitiesService from "@/services/activities-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await activitiesService.findAllActivities();

    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getActivitiesByLocalityAndDay(req: AuthenticatedRequest, res: Response) {
  const { date, localityId }= req.body;
  try {
    const activities = await activitiesService.findActivitiesByLocalityAndDay(date, localityId);

    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}