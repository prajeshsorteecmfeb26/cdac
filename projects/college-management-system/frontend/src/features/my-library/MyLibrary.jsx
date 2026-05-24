import { useEffect, useState } from "react";
import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { fetchBooks, fetchMyRequests, requestBook } from "../library/Service";

export function MyLibrary() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [requestingId, setRequestingId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [booksRes, requestsRes] = await Promise.all([fetchBooks(), fetchMyRequests()]);
      setBooks(booksRes.data);
      setRequests(requestsRes.data);
    } catch (e) {
      toast.error("Failed to load your library data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container className="mt-4">
      <Alert variant="primary">My Library</Alert>

      {loading ? (
        <div className="d-flex justify-content-center py-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <h5 className="mb-2">Books</h5>
          {books.length === 0 ? (
            <div className="mb-4">No books available.</div>
          ) : (
            <Table striped bordered hover responsive className="mb-4">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Total</th>
                  <th>Available</th>
                  <th>Request</th>
                </tr>
              </thead>
              <tbody>
                {books.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.title}</td>
                    <td>{b.author ?? "-"}</td>
                    <td>{b.isbn ?? "-"}</td>
                    <td>{b.copies_total}</td>
                    <td>{b.copies_available}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="primary"
                        disabled={requestingId === b.id}
                        onClick={async () => {
                          setRequestingId(b.id);
                          try {
                            await requestBook(b.id);
                            toast.success("Request sent");
                            const requestsRes = await fetchMyRequests();
                            setRequests(requestsRes.data);
                          } catch (e) {
                            toast.error("Request failed");
                          } finally {
                            setRequestingId(null);
                          }
                        }}
                      >
                        {requestingId === b.id ? "Requesting..." : "Request"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <h5 className="mb-2">My Requests</h5>
          {requests.length === 0 ? (
            <div>No requests yet.</div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.title}</td>
                    <td>{r.author ?? "-"}</td>
                    <td>{String(r.requestDate).slice(0, 10)}</td>
                    <td>{r.status}</td>
                    <td>{r.notes ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Container>
  );
}

