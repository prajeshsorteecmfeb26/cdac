import { Router } from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { addBook, adminIssues, editBook, getBooks, issue, myIssues, returnIssued } from "../controllers/LibraryController.js";

const libraryRouter = Router();

libraryRouter.get("/books", verifyToken, getBooks); // admin + student
libraryRouter.post("/books", verifyToken, addBook); // admin
libraryRouter.put("/books/:id", verifyToken, editBook); // admin

libraryRouter.post("/issue", verifyToken, issue); // admin
libraryRouter.post("/return/:issueId", verifyToken, returnIssued); // admin
libraryRouter.get("/issues", verifyToken, adminIssues); // admin
libraryRouter.get("/my-issues", verifyToken, myIssues); // student

export default libraryRouter;

