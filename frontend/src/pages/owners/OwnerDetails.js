import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getOwnerById, deleteOwner } from '../../services/ownerService';
import { getPetsByOwner } from '../../services/petService';

const OwnerDetails = () => {
  const [owner, setOwner] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwnerAndPets = async () => {
      try {
        setLoading(true);
        const ownerData = await getOwnerById(id);
        setOwner(ownerData);
        
        const petsData = await getPetsByOwner(id);
        setPets(petsData);
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch owner details. Please try again later.');
        console.error('Error fetching owner details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerAndPets();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this owner?')) {
      try {
        await deleteOwner(id);
        navigate('/owners');
      } catch (err) {
        setError('Failed to delete owner. Please try again later.');
        console.error('Error deleting owner:', err);
      }
    }
  };

  if (loading) {
    return <Container><p className="text-center mt-5">Loading owner details...</p></Container>;
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger" className="mt-3">{error}</Alert>
        <Link to="/owners">
          <Button variant="secondary">Back to Owners</Button>
        </Link>
      </Container>
    );
  }

  if (!owner) {
    return (
      <Container>
        <Alert variant="warning" className="mt-3">Owner not found</Alert>
        <Link to="/owners">
          <Button variant="secondary">Back to Owners</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Owner Details</h1>
        </Col>
        <Col className="text-end">
          <Link to="/owners" className="me-2">
            <Button variant="secondary">Back</Button>
          </Link>
          <Link to={`/owners/edit/${id}`} className="me-2">
            <Button variant="primary">Edit</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h4>Owner Information</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Name:</strong> {owner.firstName} {owner.lastName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {owner.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone:</strong> {owner.phone}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Address:</strong> {owner.address.street}, {owner.address.city}, {owner.address.zipCode}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4>Pets</h4>
              <Link to={`/pets/add/${id}`}>
                <Button variant="success" size="sm">Add Pet</Button>
              </Link>
            </Card.Header>
            <Card.Body>
              {pets.length === 0 ? (
                <p className="text-center">No pets found for this owner.</p>
              ) : (
                <ListGroup variant="flush">
                  {pets.map(pet => (
                    <ListGroup.Item key={pet._id} className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{pet.name}</strong> ({pet.species}, {pet.breed || 'Unknown breed'})
                      </div>
                      <Link to={`/pets/${pet._id}`}>
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

export default OwnerDetails; 