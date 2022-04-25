import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function RegisterPage() {
  return (
    <>
      <Container>
        <h2 className="mt-5 primary text-center">Zarejestruj się</h2>
        <Row className="mt-5">
          <Col lg={4} md={6} sm={12} className="p-5 m-auto shadow rounded-lg">
            <Form className="d-grid gap-2">
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Imię</Form.Label>
                <Form.Control type="text" placeholder="Imię" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Nazwisko</Form.Label>
                <Form.Control type="text" placeholder="Nazwisko" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Adres email</Form.Label>
                <Form.Control type="email" placeholder="Adres email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Zarejestruj się
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RegisterPage;
