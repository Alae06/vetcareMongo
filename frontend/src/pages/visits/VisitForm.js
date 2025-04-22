import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getVisitById, createVisit, updateVisit } from '../../services/visitService';
import { getAllPets } from '../../services/petService';
import { getAllVeterinarians } from '../../services/vetService';

const VisitForm = () => {
  const initialFormState = {
    pet: '',
    veterinarian: '',
    date: new Date().toISOString().split('T')[0],
    reason: '',
    diagnosis: '',
    treatment: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { id, petId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPets();
    fetchVets();
    
    if (id) {
      setIsEditMode(true);
      fetchVisit();
    } else if (petId) {
      setFormData(prev => ({ ...prev, pet: petId }));
    }
  }, [id, petId]);

  const fetchPets = async () => {
    try {
      const data = await getAllPets();
      setPets(data);
    } catch (err) {
      setError('Failed to fetch pets. Please try again later.');
      console.error('Error fetching pets:', err);
    }
  };

  const fetchVets = async () => {
    try {
      const data = await getAllVeterinarians();
      setVets(data);
    } catch (err) {
      setError('Failed to fetch veterinarians. Please try again later.');
      console.error('Error fetching veterinarians:', err);
    }
  };

  const fetchVisit = async () => {
    try {
      setLoading(true);
      const data = await getVisitById(id);
      
      // Format the date to YYYY-MM-DD for the input
      if (data.date) {
        const date = new Date(data.date);
        data.date = date.toISOString().split('T')[0];
      }
      
      setFormData(data);
    } catch (err) {
      setError('Failed to fetch visit details. Please try again later.');
      console.error('Error fetching visit:', err);
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
        await updateVisit(id, formData);
      } else {
        await createVisit(formData);
      }
      navigate(formData.pet ? `/pets/${formData.pet}` : '/visits');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} visit. Please try again later.`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} visit:`, err);
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <Container><p className="text-center mt-5">Loading visit details...</p></Container>;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>{isEditMode ? 'Edit Visit' : 'Add New Visit'}</h1>
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
                      <Form.Label>Pet</Form.Label>
                      <Form.Select
                        name="pet"
                        value={formData.pet}
                        onChange={handleChange}
                        required
                        disabled={petId !== undefined}
                      >
                        <option value="">Select Pet</option>
                        {pets.map(pet => (
                          <option key={pet._id} value={pet._id}>
                            {pet.name} ({pet.species}) - Owner: {pet.owner ? `${pet.owner.firstName} ${pet.owner.lastName}` : 'Unknown'}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Veterinarian</Form.Label>
                      <Form.Select
                        name="veterinarian"
                        value={formData.veterinarian}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Veterinarian</option>
                        {vets.map(vet => (
                          <option key={vet._id} value={vet._id}>
                            Dr. {vet.firstName} {vet.lastName} {vet.specialization ? `(${vet.specialization})` : ''}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Reason for Visit</Form.Label>
                      <Form.Control
                        type="text"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Diagnosis</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Treatment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Additional Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Link to={formData.pet ? `/pets/${formData.pet}` : '/visits'} className="me-2">
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

export default VisitForm; 