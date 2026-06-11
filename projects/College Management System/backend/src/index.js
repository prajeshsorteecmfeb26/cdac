import express from 'express';
import studentRouter from "./routers/StudentRouter.js"
import adminRouter from './routers/AdminRouter.js';
import studentAuthRouter from "./routers/StudentAuthRouter.js";
import attendanceRouter from "./routers/AttendanceRouter.js";
import libraryRouter from "./routers/LibraryRouter.js";
import libraryRequestRouter from "./routers/LibraryRequestRouter.js";
import cors from 'cors';

const app = express();
app.use(cors()); 
app.use(express.json());

app.use("/students",studentRouter);
app.use("/admins",adminRouter);
app.use("/student-auth", studentAuthRouter);
app.use("/attendance", attendanceRouter);
app.use("/library", libraryRouter);
app.use("/library-requests", libraryRequestRouter);

const port = Number(process.env.PORT) || 9000;

const server = app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});

server.on("error", (error) => {
  console.error(`Failed to start backend on port ${port}:`, error.message);
  process.exit(1);
});