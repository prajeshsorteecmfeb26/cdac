import { useEffect, useMemo, useState } from "react";
import { Alert, Button, ButtonGroup, Container, Form, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { fetchAllStudents } from "../students-list/Service";
import { fetchAttendanceByDate, markAttendance } from "./Service";

function formatDateISO(d) {
  return d.toISOString().slice(0, 10);
}

export function Attendance() {
  const [date, setDate] = useState(formatDateISO(new Date()));
  const [students, setStudents] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({}); // studentId -> 'P' | 'A'
  const [loading, setLoading] = useState(true);
  const [savingIds, setSavingIds] = useState({}); // studentId -> boolean

  const rows = useMemo(() => {
    return students.map((s) => ({
      ...s,
      status: attendanceMap[s.id] ?? "",
    }));
  }, [students, attendanceMap]);

  const load = async () => {
    setLoading(true);
    try {
      const [studentsRes, attendanceRes] = await Promise.all([
        fetchAllStudents(),
        fetchAttendanceByDate(date),
      ]);

      setStudents(studentsRes.data);

      const map = {};
      for (const a of attendanceRes.data) {
        map[a.studentId] = a.status;
      }
      setAttendanceMap(map);
    } catch (e) {
      toast.error("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [date]);

  const setStatusLocal = (studentId, status) => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const saveOne = async (studentId) => {
    const status = attendanceMap[studentId];
    if (!status) {
      toast.info("Select Present/Absent first");
      return;
    }
    setSavingIds((p) => ({ ...p, [studentId]: true }));
    try {
      await markAttendance({ studentId, date, status });
      toast.success("Saved");
    } catch (e) {
      toast.error("Save failed");
    } finally {
      setSavingIds((p) => ({ ...p, [studentId]: false }));
    }
  };

  const saveAll = async () => {
    const toSave = students
      .map((s) => s.id)
      .filter((id) => attendanceMap[id] === "P" || attendanceMap[id] === "A");

    if (toSave.length === 0) {
      toast.info("No attendance selected");
      return;
    }

    try {
      await Promise.all(toSave.map((studentId) => markAttendance({ studentId, date, status: attendanceMap[studentId] })));
      toast.success("Attendance saved");
      await load();
    } catch (e) {
      toast.error("Saving attendance failed");
    }
  };

  return (
    <Container className="mt-4">
      <Alert variant="success" className="d-flex justify-content-between align-items-center">
        <div>Attendance Management</div>
        <div className="d-flex gap-2 align-items-center">
          <Form.Label className="mb-0">Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: 170 }}
          />
          <Button variant="primary" onClick={saveAll}>
            Save All
          </Button>
        </div>
      </Alert>

      {loading ? (
        <div className="d-flex justify-content-center py-4">
          <Spinner animation="border" />
        </div>
      ) : rows.length === 0 ? (
        <div>No students found.</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Phone</th>
              <th>City</th>
              <th>Marks</th>
              <th>Status</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.phone}</td>
                <td>{s.city}</td>
                <td>{s.marks}</td>
                <td>
                  <ButtonGroup size="sm">
                    <Button
                      variant={s.status === "P" ? "success" : "outline-success"}
                      onClick={() => setStatusLocal(s.id, "P")}
                    >
                      Present
                    </Button>
                    <Button
                      variant={s.status === "A" ? "danger" : "outline-danger"}
                      onClick={() => setStatusLocal(s.id, "A")}
                    >
                      Absent
                    </Button>
                  </ButtonGroup>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="primary"
                    disabled={!!savingIds[s.id]}
                    onClick={() => saveOne(s.id)}
                  >
                    {savingIds[s.id] ? "Saving..." : "Save"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

