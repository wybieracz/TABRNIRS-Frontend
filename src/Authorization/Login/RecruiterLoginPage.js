import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { defaultCredentails } from "../../DefaultData/DefaultCredentials";
import { Link, useNavigate } from "react-router-dom";
import LoadingIcon from "../../Graphic/Load_White.png";
import {
  LoadingIconWrapper,
  ButtonIconWrapper,
} from "../../Graphic/IconsStyled";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function RecruiterLoginPage({ setUserId, setIsRecruiter }) {
  const [credentials, setCredentials] = useState(defaultCredentails);
  const [isRequestSent, setRequestSent] = useState(false);
  const navigate = useNavigate();

  function onKeyDown(event) {
    if (event.key === "Enter" || event.key === "NumpadEnter") {
      handleLogin();
    }
  }

  async function handleLogin() {
    setRequestSent(true);
    try {
      await axios.post("https://dev-tabrnirs-be-app.azurewebsites.net/login", credentials)
    } catch (error) {
      alert("Błędny login lub hasło!");
      console.error(error);
      setRequestSent(false);
      navigate("/");
    }
    
    try {
      await axios
      .get("https://dev-tabrnirs-be-app.azurewebsites.net/user/id")
      .then((response) => {
        setIsRecruiter(true)
        setUserId(response.data);
        navigate("/recruiter/personal-data");
        setRequestSent(false);
      });
    } catch (error) {
      console.error(error);
      setRequestSent(false);
      navigate("/");
    }
  }

  return (
    <div onKeyDown={onKeyDown}>
      <Container>
        <h2 className="mt-5 primary text-center">Zaloguj się</h2>
        <Row className="mt-5">
          <Col lg={4} md={6} sm={12} className="p-5 m-auto shadow rounded-lg">
            <Form className="d-grid gap-2">
              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Adres email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      email: `${e.target.value}`,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Hasło"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: `${e.target.value}`,
                    })
                  }
                />
              </Form.Group>

              <Button variant="primary" onClick={handleLogin}>
                {isRequestSent ? (
                  <ButtonIconWrapper>
                    <LoadingIconWrapper size="20px">
                      <img
                        src={LoadingIcon}
                        alt="LoadingIcon"
                        width="20px"
                        heigth="20px"
                      />
                    </LoadingIconWrapper>
                  </ButtonIconWrapper>
                ) : (
                  "Login"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
