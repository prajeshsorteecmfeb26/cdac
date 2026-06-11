import { Route, Routes } from "react-router-dom";
import { Home } from "../features/home/Home";
import { StudentsList } from "../features/students-list/StudentsList";
import { StudentRegistration } from "../features/student-registration/StudentRegistration";
import { UpdateStudent } from "../features/update-student/UpdateStudent";
import { Login } from "../features/login/Login";
import { PrivateRoute } from "./PrivateRoute";
import { Library } from "../features/library/Library";
import { Attendance } from "../features/attendance/Attendance";
import { MyAttendance } from "../features/my-attendance/MyAttendance";
import { MyLibrary } from "../features/my-library/MyLibrary";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute/>} > 
                <Route path="/home" element={<Home />} />
                <Route path="/students-list" element={<StudentsList />} />
                <Route path="/register-student" element={<StudentRegistration />} />
                <Route path="/edit-student/:id" element={<UpdateStudent />} />
                <Route path="/library" element={<Library />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/my-attendance" element={<MyAttendance />} />
                <Route path="/my-library" element={<MyLibrary />} />
            </Route>

        </Routes>
    )
}