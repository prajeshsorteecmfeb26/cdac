import {
  createBook,
  getAllBooks,
  issueBook,
  listIssues,
  listIssuesByStudent,
  returnBook,
  updateBook,
} from "../models/LibraryModel.js";

export const getBooks = async (request, response) => {
  try {
    const rows = await getAllBooks();
    return response.status(200).json(rows);
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const addBook = async (request, response) => {
  try {
    if (request.user?.role !== "admin") {
      return response.status(403).json({ message: "Forbidden" });
    }
    const { title, author, isbn, copiesTotal } = request.body;
    if (!title) {
      return response.status(400).json({ message: "title is required" });
    }
    const result = await createBook(title, author, isbn, copiesTotal);
    return response.status(201).json({ insertedId: result.insertId });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const editBook = async (request, response) => {
  try {
    if (request.user?.role !== "admin") {
      return response.status(403).json({ message: "Forbidden" });
    }
    const { id } = request.params;
    const { title, author, isbn, copiesTotal, copiesAvailable } = request.body;
    if (!title) {
      return response.status(400).json({ message: "title is required" });
    }
    await updateBook(id, title, author, isbn, copiesTotal, copiesAvailable);
    return response.status(200).json({ message: "Book updated" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const issue = async (request, response) => {
  try {
    if (request.user?.role !== "admin") {
      return response.status(403).json({ message: "Forbidden" });
    }
    const { bookId, studentId, issueDate, dueDate } = request.body;
    if (!bookId || !studentId || !issueDate) {
      return response.status(400).json({ message: "bookId, studentId and issueDate are required" });
    }
    const result = await issueBook(bookId, studentId, request.user.adminId, issueDate, dueDate);
    return response.status(201).json({ insertedId: result.insertId });
  } catch (error) {
    if (error?.message === "BOOK_NOT_FOUND") {
      return response.status(404).json({ message: "Book not found" });
    }
    if (error?.message === "NO_COPIES") {
      return response.status(400).json({ message: "No copies available" });
    }
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const returnIssued = async (request, response) => {
  try {
    if (request.user?.role !== "admin") {
      return response.status(403).json({ message: "Forbidden" });
    }
    const { issueId } = request.params;
    const { returnDate } = request.body;
    if (!returnDate) {
      return response.status(400).json({ message: "returnDate is required" });
    }
    await returnBook(issueId, returnDate);
    return response.status(200).json({ message: "Returned" });
  } catch (error) {
    if (error?.message === "ISSUE_NOT_FOUND") {
      return response.status(404).json({ message: "Issue not found" });
    }
    if (error?.message === "ALREADY_RETURNED") {
      return response.status(400).json({ message: "Already returned" });
    }
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const adminIssues = async (request, response) => {
  try {
    if (request.user?.role !== "admin") {
      return response.status(403).json({ message: "Forbidden" });
    }
    const rows = await listIssues();
    return response.status(200).json(rows);
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const myIssues = async (request, response) => {
  try {
    if (request.user?.role !== "student") {
      return response.status(403).json({ message: "Forbidden" });
    }
    const rows = await listIssuesByStudent(request.user.studentId);
    return response.status(200).json(rows);
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

