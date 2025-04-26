import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllVisits, deleteVisit } from '../../services/visitService';

const VisitsList = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      setLoading(true);
      const data = await getAllVisits();
      setVisits(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch visits. Please try again later.');
      console.error('Error fetching visits:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this visit?')) {
      try {
        await deleteVisit(id);
        setVisits(visits.filter(visit => visit._id !== id));
      } catch (err) {
        setError('Failed to delete visit. Please try again later.');
        console.error('Error deleting visit:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Medical Visits</h1>
        </Col>
        <Col className="text-end">
          <Link to="/visits/add">
            <Button variant="success">Add New Visit</Button>
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
                <p className="text-center">Loading visits...</p>
              ) : visits.length === 0 ? (
                <p className="text-center">No visits found. Add a new visit to get started.</p>
              ) : (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Pet</th>
                      {/* <th>Owner</th> */}
                      <th>Veterinarian</th>
                      <th>Reason</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visits.map((visit) => (
                      <tr key={visit._id}>
                        <td>{formatDate(visit.date)}</td>
                        <td>
                          {visit.pet ? (
                            <Link to={`/pets/${visit.pet._id}`}>
                              {visit.pet.name}
                            </Link>
                          ) : 'Unknown'}
                        </td>
                        {/* <td>
                          {visit.pet && visit.pet.owner ? (
                            <Link to={`/owners/${visit.pet.owner._id}`}>
                              {`${visit.pet.owner.firstName} ${visit.pet.owner.lastName}`}
                            </Link>
                          ) : 'Unknown'}
                        </td> */}
                        <td>
                          {visit.veterinarian ? (
                            <Link to={`/vets/${visit.veterinarian._id}`}>
                              Dr. {visit.veterinarian.firstName} {visit.veterinarian.lastName}
                            </Link>
                          ) : 'Unknown'}
                        </td>
                        <td>{visit.reason}</td>
                        <td>
                          <Link to={`/visits/${visit._id}`}>
                            <Button variant="info" size="sm" className="me-2">View</Button>
                          </Link>
                          <Link to={`/visits/edit/${visit._id}`}>
                            <Button variant="primary" size="sm" className="me-2">Edit</Button>
                          </Link>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => handleDelete(visit._id)}
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

export default VisitsList; 