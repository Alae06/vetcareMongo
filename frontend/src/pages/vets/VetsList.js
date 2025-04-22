import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllVeterinarians, deleteVeterinarian } from '../../services/vetService';

const VetsList = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVets();
  }, []);

  const fetchVets = async () => {
    try {
      setLoading(true);
      const data = await getAllVeterinarians();
      setVets(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch veterinarians. Please try again later.');
      console.error('Error fetching veterinarians:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this veterinarian?')) {
      try {
        await deleteVeterinarian(id);
        setVets(vets.filter(vet => vet._id !== id));
      } catch (err) {
        setError('Failed to delete veterinarian. Please try again later.');
        console.error('Error deleting veterinarian:', err);
      }
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Veterinarians</h1>
        </Col>
        <Col className="text-end">
          <Link to="/vets/add">
            <Button variant="success">Add New Veterinarian</Button>
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
                <p className="text-center">Loading veterinarians...</p>
              ) : vets.length === 0 ? (
                <p className="text-center">No veterinarians found. Add a new veterinarian to get started.</p>
              ) : (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Specialization</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>License Number</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vets.map((vet) => (
                      <tr key={vet._id}>
                        <td>Dr. {vet.firstName} {vet.lastName}</td>
                        <td>{vet.specialization || 'General'}</td>
                        <td>{vet.email}</td>
                        <td>{vet.phone}</td>
                        <td>{vet.licenseNumber}</td>
                        <td>
                          <Link to={`/vets/${vet._id}`}>
                            <Button variant="info" size="sm" className="me-2">View</Button>
                          </Link>
                          <Link to={`/vets/edit/${vet._id}`}>
                            <Button variant="primary" size="sm" className="me-2">Edit</Button>
                          </Link>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => handleDelete(vet._id)}
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

export default VetsList; 