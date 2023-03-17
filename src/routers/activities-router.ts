import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllActivities, getActivitiesByLocalityAndDay, getLocalitiesByDay } from "@/controllers";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("/all", getAllActivities)
  .get("/localities", getLocalitiesByDay)
  .get("/", getActivitiesByLocalityAndDay)

export { activityRouter };
