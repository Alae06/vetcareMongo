import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllPets, deletePet } from '../../services/petService';

const PetsList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getAllPets();
      setPets(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch pets. Please try again later.');
      console.error('Error fetching pets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await deletePet(id);
        setPets(pets.filter(pet => pet._id !== id));
      } catch (err) {
        setError('Failed to delete pet. Please try again later.');
        console.error('Error deleting pet:', err);
      }
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Pets</h1>
        </Col>
        <Col className="text-end">
          <Link to="/pets/add">
            <Button variant="success">Add New Pet</Button>
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
                <p className="text-center">Loading pets...</p>
              ) : pets.length === 0 ? (
                <p className="text-center">No pets found. Add a new pet to get started.</p>
              ) : (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Species</th>
                      <th>Breed</th>
                      <th>Owner</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pets.map((pet) => (
                      <tr key={pet._id}>
                        <td>{pet.name}</td>
                        <td>{pet.species}</td>
                        <td>{pet.breed || 'Unknown'}</td>
                        <td>
                          {pet.owner ? (
                            <Link to={`/owners/${pet.owner._id}`}>
                              {`${pet.owner.firstName} ${pet.owner.lastName}`}
                            </Link>
                          ) : 'Unknown'}
                        </td>
                        <td>
                          <Link to={`/pets/${pet._id}`}>
                            <Button variant="info" size="sm" className="me-2">View</Button>
                          </Link>
                          <Link to={`/pets/edit/${pet._id}`}>
                            <Button variant="primary" size="sm" className="me-2">Edit</Button>
                          </Link>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => handleDelete(pet._id)}
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

export default PetsList; 