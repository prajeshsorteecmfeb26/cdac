import { useEffect, useState } from "react";
import { Alert, Button, Container, Form, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { fetchMyAttendance } from "./Service";

function formatDateISO(d) {
  return d.toISOString().slice(0, 10);
}

export function MyAttendance() {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const [from, setFrom] = useState(formatDateISO(sevenDaysAgo));
  const [to, setTo] = useState(formatDateISO(today));
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchMyAttendance(from, to);
      setRows(res.data);
    } catch (e) {
      toast.error("Failed to load your attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container className="mt-4">
      <Alert variant="primary">My Attendance</Alert>

      <div className="d-flex gap-2 align-items-end flex-wrap mb-3">
        <Form.Group>
          <Form.Label>From</Form.Label>
          <Form.Control type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>To</Form.Label>
          <Form.Control type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={load}>Load</Button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-4">
          <Spinner animation="border" />
        </div>
      ) : rows.length === 0 ? (
        <div>No attendance records found for selected range.</div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{String(r.date).slice(0, 10)}</td>
                <td>{r.status === "P" ? "Present" : "Absent"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

