import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getVisitById, deleteVisit } from '../../services/visitService';

const VisitDetails = () => {
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisit = async () => {
      try {
        setLoading(true);
        const data = await getVisitById(id);
        setVisit(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch visit details. Please try again later.');
        console.error('Error fetching visit details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisit();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this visit?')) {
      try {
        await deleteVisit(id);
        navigate('/visits');
      } catch (err) {
        setError('Failed to delete visit. Please try again later.');
        console.error('Error deleting visit:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return <Container><p className="text-center mt-5">Loading visit details...</p></Container>;
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger" className="mt-3">{error}</Alert>
        <Link to="/visits">
          <Button variant="secondary">Back to Visits</Button>
        </Link>
      </Container>
    );
  }

  if (!visit) {
    return (
      <Container>
        <Alert variant="warning" className="mt-3">Visit not found</Alert>
        <Link to="/visits">
          <Button variant="secondary">Back to Visits</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Visit Details</h1>
        </Col>
        <Col className="text-end">
          <Link to="/visits" className="me-2">
            <Button variant="secondary">Back</Button>
          </Link>
          <Link to={`/visits/edit/${id}`} className="me-2">
            <Button variant="primary">Edit</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h4>Basic Information</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Date:</strong> {formatDate(visit.date)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Reason:</strong> {visit.reason}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Pet:</strong>{' '}
                  {visit.pet && (
                    <Link to={`/pets/${visit.pet._id}`}>
                      {visit.pet.name} ({visit.pet.species})
                    </Link>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Veterinarian:</strong>{' '}
                  {visit.veterinarian && (
                    <Link to={`/vets/${visit.veterinarian._id}`}>
                      Dr. {visit.veterinarian.firstName} {visit.veterinarian.lastName}
                    </Link>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>
              <h4>Medical Details</h4>
            </Card.Header>
            <Card.Body>
              <div className="mb-4">
                <h5>Diagnosis</h5>
                <p>{visit.diagnosis || 'No diagnosis recorded'}</p>
              </div>
              <div className="mb-4">
                <h5>Treatment</h5>
                <p>{visit.treatment || 'No treatment recorded'}</p>
              </div>
              <div>
                <h5>Notes</h5>
                <p>{visit.notes || 'No additional notes'}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VisitDetails; 