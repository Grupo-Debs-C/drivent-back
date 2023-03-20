import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {
  getVacancyByActivityId,
  postVacancy
} from "@/controllers";

const vacancyRouter = Router();

vacancyRouter
  .all("/*", authenticateToken)
  .get("", getVacancyByActivityId)
  .post('', postVacancy);

export { vacancyRouter };
