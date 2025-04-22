import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllOwners, deleteOwner } from '../../services/ownerService';

const OwnersList = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      setLoading(true);
      const data = await getAllOwners();
      setOwners(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch owners. Please try again later.');
      console.error('Error fetching owners:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this owner?')) {
      try {
        await deleteOwner(id);
        setOwners(owners.filter(owner => owner._id !== id));
      } catch (err) {
        setError('Failed to delete owner. Please try again later.');
        console.error('Error deleting owner:', err);
      }
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Owners</h1>
        </Col>
        <Col className="text-end">
          <Link to="/owners/add">
            <Button variant="success">Add New Owner</Button>
          </Link>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {loading ? (
                <p className="text-center">Loading owners...</p>
              ) : owners.length === 0 ? (
                <p className="text-center">No owners found. Add a new owner to get started.</p>
              ) : (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {owners.map((owner) => (
                      <tr key={owner._id}>
                        <td>{`${owner.firstName} ${owner.lastName}`}</td>
                        <td>{owner.email}</td>
                        <td>{owner.phone}</td>
                        <td>{`${owner.address.city}, ${owner.address.zipCode}`}</td>
                        <td>
                          <Link to={`/owners/${owner._id}`}>
                            <Button variant="info" size="sm" className="me-2">View</Button>
                          </Link>
                          <Link to={`/owners/edit/${owner._id}`}>
                            <Button variant="primary" size="sm" className="me-2">Edit</Button>
                          </Link>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => handleDelete(owner._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OwnersList;

 