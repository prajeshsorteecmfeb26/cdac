import { Router } from 'express';
import {
  login,
  register,
  listStudentCredentials,
  updateStudentPassword,
} from '../controllers/AdminController.js';
import { verifyToken } from '../middlewares/VerifyToken.js';

const adminRouter = Router();

adminRouter.post("/login", login);
adminRouter.post("/register", register);
adminRouter.get("/students/credentials", verifyToken, listStudentCredentials);
adminRouter.put("/students/:studentId/password", verifyToken, updateStudentPassword);

export default adminRouter;