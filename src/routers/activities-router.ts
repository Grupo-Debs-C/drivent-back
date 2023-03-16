import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllActivities, getActivitiesByLocalityAndDay } from "@/controllers";

const activityRouter = Router();

activityRouter
  //.all("/*", authenticateToken)
  .get("/all", getAllActivities)
  .get("", getActivitiesByLocalityAndDay)

export { activityRouter };
