import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getVeterinarianById, deleteVeterinarian } from '../../services/vetService';

const VetDetails = () => {
  const [vet, setVet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVet = async () => {
      try {
        setLoading(true);
        const data = await getVeterinarianById(id);
        setVet(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch veterinarian details. Please try again later.');
        console.error('Error fetching veterinarian details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVet();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this veterinarian?')) {
      try {
        await deleteVeterinarian(id);
        navigate('/vets');
      } catch (err) {
        setError('Failed to delete veterinarian. Please try again later.');
        console.error('Error deleting veterinarian:', err);
      }
    }
  };

  if (loading) {
    return <Container><p className="text-center mt-5">Loading veterinarian details...</p></Container>;
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger" className="mt-3">{error}</Alert>
        <Link to="/vets">
          <Button variant="secondary">Back to Veterinarians</Button>
        </Link>
      </Container>
    );
  }

  if (!vet) {
    return (
      <Container>
        <Alert variant="warning" className="mt-3">Veterinarian not found</Alert>
        <Link to="/vets">
          <Button variant="secondary">Back to Veterinarians</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Veterinarian Details</h1>
        </Col>
        <Col className="text-end">
          <Link to="/vets" className="me-2">
            <Button variant="secondary">Back</Button>
          </Link>
          <Link to={`/vets/edit/${id}`} className="me-2">
            <Button variant="primary">Edit</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Dr. {vet.firstName} {vet.lastName}</h4>
              {vet.specialization && <p className="mb-0 text-muted">{vet.specialization}</p>}
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Email:</strong> {vet.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone:</strong> {vet.phone}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>License Number:</strong> {vet.licenseNumber}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VetDetails; 