import { createRequest, listMyRequests, listRequests, updateRequestStatus } from "../models/LibraryRequestModel.js";

export const requestBook = async (request, response) => {
  try {
    if (request.user?.role !== "student") {
      return response.status(403).json({ message: "Forbidden" });
    }

    const { bookId } = request.body;
    if (!bookId) {
      return response.status(400).json({ message: "bookId is required" });
    }
    const today = new Date().toISOString().slice(0, 10);
    const result = await createRequest(bookId, request.user.studentId, today);
    return response.status(201).json({ insertedId: result.insertId });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const myRequests = async (request, response) => {
  try {
    if (request.user?.role !== "student") {
      return response.status(403).json({ message: "Forbidden" });
    }
    const rows = await listMyRequests(request.user.studentId);
    return response.status(200).json(rows);
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const adminListRequests = async (request, response) => {
  try {
    if (request.user?.role !== "admin") {
      return response.status(403).json({ message: "Forbidden" });
    }
    const rows = await listRequests();
    return response.status(200).json(rows);
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

export const adminUpdateRequest = async (request, response) => {
  try {
    if (request.user?.role !== "admin") {
      return response.status(403).json({ message: "Forbidden" });
    }

    const { id } = request.params;
    const { status, notes } = request.body;
    if (!["APPROVED", "REJECTED"].includes(status)) {
      return response.status(400).json({ message: "status must be APPROVED or REJECTED" });
    }

    await updateRequestStatus(id, status, notes);
    return response.status(200).json({ message: "Updated" });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};

