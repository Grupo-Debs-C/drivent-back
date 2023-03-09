import { Router } from "express";
import { github } from "@/controllers";

const githubRouter = Router();

githubRouter
.post("/", github);

export { githubRouter };
