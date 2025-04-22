import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <h5>VetCare 360</h5>
            <p className="text-muted">
              A comprehensive veterinary clinic management system
            </p>
          </Col>
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/owners" className="text-white">Owners</a></li>
              <li><a href="/pets" className="text-white">Pets</a></li>
              <li><a href="/visits" className="text-white">Visits</a></li>
              <li><a href="/vets" className="text-white">Veterinarians</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact</h5>
            <address className="text-muted">
              123 Vet Street<br />
              Animal City, AC 12345<br />
              <a href="mailto:info@vetcare360.com" className="text-white">info@vetcare360.com</a><br />
              <a href="tel:+1234567890" className="text-white">(123) 456-7890</a>
            </address>
          </Col>
        </Row>
        <hr className="my-4" />
        <Row>
          <Col>
            <p className="text-center text-muted mb-0">
              &copy; {currentYear} VetCare 360. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 