import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllActivities, getActivitiesByLocalityAndDay, getLocalities } from "@/controllers";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("/all", getAllActivities)
  .get("/localities", getLocalities)
  .get("/", getActivitiesByLocalityAndDay)

export { activityRouter };
