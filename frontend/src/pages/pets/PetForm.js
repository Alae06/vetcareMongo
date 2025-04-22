import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPetById, createPet, updatePet } from '../../services/petService';
import { getAllOwners } from '../../services/ownerService';

const PetForm = () => {
  const initialFormState = {
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    gender: 'Unknown',
    owner: '',
    medicalHistory: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { id, ownerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOwners();
    
    if (id) {
      setIsEditMode(true);
      fetchPet();
    } else if (ownerId) {
      setFormData(prev => ({ ...prev, owner: ownerId }));
    }
  }, [id, ownerId]);

  const fetchOwners = async () => {
    try {
      const data = await getAllOwners();
      setOwners(data);
    } catch (err) {
      setError('Failed to fetch owners. Please try again later.');
      console.error('Error fetching owners:', err);
    }
  };

  const fetchPet = async () => {
    try {
      setLoading(true);
      const data = await getPetById(id);
      
      // Format the date to YYYY-MM-DD for the input
      if (data.birthDate) {
        const date = new Date(data.birthDate);
        data.birthDate = date.toISOString().split('T')[0];
      }
      
      setFormData(data);
    } catch (err) {
      setError('Failed to fetch pet details. Please try again later.');
      console.error('Error fetching pet:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      if (isEditMode) {
        await updatePet(id, formData);
      } else {
        await createPet(formData);
      }
      navigate(formData.owner ? `/owners/${formData.owner}` : '/pets');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} pet. Please try again later.`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} pet:`, err);
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <Container><p className="text-center mt-5">Loading pet details...</p></Container>;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>{isEditMode ? 'Edit Pet' : 'Add New Pet'}</h1>
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
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Species</Form.Label>
                      <Form.Control
                        type="text"
                        name="species"
                        value={formData.species}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Breed</Form.Label>
                      <Form.Control
                        type="text"
                        name="breed"
                        value={formData.breed}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Birth Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unknown">Unknown</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Owner</Form.Label>
                      <Form.Select
                        name="owner"
                        value={formData.owner}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Owner</option>
                        {owners.map(owner => (
                          <option key={owner._id} value={owner._id}>
                            {`${owner.firstName} ${owner.lastName}`}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Medical History</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Link to={formData.owner ? `/owners/${formData.owner}` : '/pets'} className="me-2">
                    <Button variant="secondary">Cancel</Button>
                  </Link>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PetForm; 