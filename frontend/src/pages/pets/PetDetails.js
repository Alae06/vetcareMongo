import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPetById, deletePet } from '../../services/petService';
import { getVisitsByPet } from '../../services/visitService';

const PetDetails = () => {
  const [pet, setPet] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetAndVisits = async () => {
      try {
        setLoading(true);
        const petData = await getPetById(id);
        setPet(petData);
        
        const visitsData = await getVisitsByPet(id);
        setVisits(visitsData);
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch pet details. Please try again later.');
        console.error('Error fetching pet details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPetAndVisits();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await deletePet(id);
        navigate('/pets');
      } catch (err) {
        setError('Failed to delete pet. Please try again later.');
        console.error('Error deleting pet:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return <Container><p className="text-center mt-5">Loading pet details...</p></Container>;
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger" className="mt-3">{error}</Alert>
        <Link to="/pets">
          <Button variant="secondary">Back to Pets</Button>
        </Link>
      </Container>
    );
  }

  if (!pet) {
    return (
      <Container>
        <Alert variant="warning" className="mt-3">Pet not found</Alert>
        <Link to="/pets">
          <Button variant="secondary">Back to Pets</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Pet Details: {pet.name}</h1>
        </Col>
        <Col className="text-end">
          <Link to="/pets" className="me-2">
            <Button variant="secondary">Back</Button>
          </Link>
          <Link to={`/pets/edit/${id}`} className="me-2">
            <Button variant="primary">Edit</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h4>Pet Information</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Name:</strong> {pet.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Species:</strong> {pet.species}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Breed:</strong> {pet.breed || 'Unknown'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Gender:</strong> {pet.gender}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Birth Date:</strong> {formatDate(pet.birthDate)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Owner:</strong>{' '}
                  {pet.owner ? (
                    <Link to={`/owners/${pet.owner._id}`}>
                      {`${pet.owner.firstName} ${pet.owner.lastName}`}
                    </Link>
                  ) : 'Unknown'}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          {pet.medicalHistory && (
            <Card className="mt-4">
              <Card.Header>
                <h4>Medical History</h4>
              </Card.Header>
              <Card.Body>
                <p>{pet.medicalHistory}</p>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4>Medical Visits</h4>
              <Link to={`/visits/add/${id}`}>
                <Button variant="success" size="sm">Add Visit</Button>
              </Link>
            </Card.Header>
            <Card.Body>
              {visits.length === 0 ? (
                <p className="text-center">No visits recorded for this pet.</p>
              ) : (
                <ListGroup variant="flush">
                  {visits.map(visit => (
                    <ListGroup.Item key={visit._id} className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{formatDate(visit.date)}</strong> - {visit.reason}
                        <div className="text-muted">
                          Vet: {`${visit.veterinarian.firstName} ${visit.veterinarian.lastName}`}
                        </div>
                      </div>
                      <Link to={`/visits/${visit._id}`}>
                        <Button variant="info" size="sm">View</Button>
                      </Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PetDetails; 