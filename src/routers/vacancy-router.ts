import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getVacancyByActivityId } from "@/controllers";

const vacancyRouter = Router();

vacancyRouter
  //.all("/*", authenticateToken)
  .get("", getVacancyByActivityId)

export { vacancyRouter };
