import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function LoginPage() {
  return (
    <>
      <Container>
        <h2 className="mt-5 primary text-center">Zaloguj się</h2>
        <Row className="mt-5">
          <Col lg={4} md={6} sm={12} className="p-5 m-auto shadow rounded-lg">
            <Form className="d-grid gap-2">
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control type="email" placeholder="Adres email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Control type="password" placeholder="Hasło" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Zaloguj się
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginPage;
