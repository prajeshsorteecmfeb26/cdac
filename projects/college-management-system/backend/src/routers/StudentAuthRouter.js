import { Router } from "express";
import { activateStudent, loginStudent } from "../controllers/StudentAuthController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const studentAuthRouter = Router();

studentAuthRouter.post("/login", loginStudent);

// Activation is admin-only (enforced in controller via payload role check in a later step).
studentAuthRouter.post("/activate", verifyToken, activateStudent);

export default studentAuthRouter;

