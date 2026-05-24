import { Router } from "express";
import { deleteById, getAll, getById, save, updateById } from "../controllers/StudentController.js";
import { verifyToken } from "../middlewares/VerifyToken.js";
const studentRouter = Router();

studentRouter.get("/", verifyToken, getAll);
studentRouter.get("/:id", verifyToken, getById);
studentRouter.post("/", verifyToken, save);
studentRouter.delete("/:id", verifyToken, deleteById);
studentRouter.put("/:id", verifyToken, updateById );

export default studentRouter;