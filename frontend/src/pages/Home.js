import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="jumbotron bg-light p-5 rounded">
            <h1 className="display-4">Welcome to VetCare 360</h1>
            <p className="lead">
              A comprehensive veterinary clinic management system that helps you manage pets, owners, visits, and veterinarians.
            </p>
            <hr className="my-4" />
            <p>
              Use the dashboard below to navigate through different sections of the application.
            </p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Owners</Card.Title>
              <Card.Text>
                Manage pet owners, including their contact information and pets.
              </Card.Text>
              <Link to="/owners">
                <Button variant="primary">View Owners</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Pets</Card.Title>
              <Card.Text>
                Manage pets, track their medical history, and associate them with owners.
              </Card.Text>
              <Link to="/pets">
                <Button variant="primary">View Pets</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Visits</Card.Title>
              <Card.Text>
                Record and manage medical visits, diagnoses, and treatments.
              </Card.Text>
              <Link to="/visits">
                <Button variant="primary">View Visits</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Veterinarians</Card.Title>
              <Card.Text>
                Manage veterinarians, their specializations, and schedules.
              </Card.Text>
              <Link to="/vets">
                <Button variant="primary">View Veterinarians</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home; 