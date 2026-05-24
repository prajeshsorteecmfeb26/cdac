import { useEffect, useState } from "react";
import { Alert, Button, Container, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { fetchBooks, requestBook } from "./Service";
import { getRole } from "../login/TokenService";

export function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState(null);
  const role = getRole();

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchBooks();
      setBooks(res.data);
    } catch (e) {
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container className="mt-4">
      <Alert variant="success">Library Books</Alert>

      {loading ? (
        <div className="d-flex justify-content-center py-4">
          <Spinner animation="border" />
        </div>
      ) : books.length === 0 ? (
        <div className="py-2">No books found.</div>
      ) : (
        <Table striped bordered hover responsive className="mt-2">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Total</th>
              <th>Available</th>
              {role === "student" ? <th>Request</th> : null}
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
                {role === "student" ? (
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
                ) : null}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

