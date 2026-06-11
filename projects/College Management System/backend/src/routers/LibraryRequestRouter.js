import { Router } from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { adminListRequests, adminUpdateRequest, myRequests, requestBook } from "../controllers/LibraryRequestController.js";

const libraryRequestRouter = Router();

libraryRequestRouter.post("/", verifyToken, requestBook); // student
libraryRequestRouter.get("/me", verifyToken, myRequests); // student

libraryRequestRouter.get("/", verifyToken, adminListRequests); // admin
libraryRequestRouter.put("/:id", verifyToken, adminUpdateRequest); // admin (approve/reject)

export default libraryRequestRouter;

