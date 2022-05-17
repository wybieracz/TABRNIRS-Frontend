import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { defaultRegisterData, defaultValidationSet } from "../../DefaultData/DefaultRegisterData";
import LoadingIcon from "../../Graphic/Load_White.png";
import {
  LoadingIconWrapper,
  ButtonIconWrapper,
} from "../../Graphic/IconsStyled";
import axios from "axios";

axios.defaults.withCredentials = true;

function RegisterPage() {

  const [registerData, setRegisterData] = useState(defaultRegisterData);
  const [isRequestSent, setRequestSent] = useState(false);
  const [validationSet, setValidationSet] = useState(defaultValidationSet);
  const [valid, setValid] = useState(false);
  const [submit, setSubmit] = useState(false);

  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const validPostalCode = /^[0-9]{2}-[0-9]{3}$/;
  const validPesel = /^[0-9]{11}$/;

  const navigate = useNavigate();

  useEffect(() => {
    registerData.name.length > 0
      ? setValidationSet({...validationSet, nameErr: false})
      : setValidationSet({...validationSet, nameErr: true});
}, [registerData.name]);

useEffect(() => {
  registerData.surname.length > 0
    ? setValidationSet({...validationSet, surnameErr: false})
    : setValidationSet({...validationSet, surnameErr: true});
}, [registerData.surname]);

useEffect(() => {
  registerData.hometown.length > 0
    ? setValidationSet({...validationSet, hometownErr: false})
    : setValidationSet({...validationSet, hometownErr: true});
}, [registerData.hometown]);

useEffect(() => {
  registerData.streetAddress.length > 0
    ? setValidationSet({...validationSet, streetAddressErr: false})
    : setValidationSet({...validationSet, streetAddressErr: true});
}, [registerData.streetAddress]);

useEffect(() => {
    validEmail.test(registerData.email)
      ? setValidationSet({...validationSet, emailErr: false})
      : setValidationSet({...validationSet, emailErr: true})
}, [registerData.email]);

useEffect(() => {
  validPostalCode.test(registerData.postalCode)
    ? setValidationSet({...validationSet, postalCodeErr: false})
    : setValidationSet({...validationSet, postalCodeErr: true})
}, [registerData.postalCode]);

useEffect(() => {
  validPesel.test(registerData.pesel)
    ? setValidationSet({...validationSet, peselErr: false})
    : setValidationSet({...validationSet, peselErr: true})
}, [registerData.pesel]);



useEffect(() => {
    !registerData.password.localeCompare(registerData.confirmPassword)
      ? setValidationSet({...validationSet, confirmPasswordErr: false})
      : setValidationSet({...validationSet, confirmPasswordErr: true});
}, [registerData.password]);

useEffect(() => {
  validPassword.test(registerData.password)
    ? setValidationSet({...validationSet, passwordErr: false})
    : setValidationSet({...validationSet, passwordErr: true});
}, [registerData.password]);

useEffect(() => {
    (validPassword.test(registerData.confirmPassword) && !registerData.password.localeCompare(registerData.confirmPassword))
      ? setValidationSet({...validationSet, confirmPasswordErr: false})
      : setValidationSet({...validationSet, confirmPasswordErr: true});
}, [registerData.confirmPassword]);

useEffect(() => {
    (validationSet.nameErr || validationSet.surnameErr || validationSet.emailErr || validationSet.passwordErr
      || validationSet.confirmPasswordErr || validationSet.hometownErr || validationSet.peselErr
      || validationSet.postalCodeErr || validationSet.streetAddressErr) ? setValid(false) : setValid(true);
}, [validationSet]);

  function onKeyDown(event) {
    if (event.key === "Enter" || event.key === "NumpadEnter") {
      handleRegister()
    }
  }

  async function handleRegister() {

    setSubmit(true)
    
    if(valid) {

      setRequestSent(true)
      try {
        await axios
          .post(
            "https://dev-tabrnirs-be-app.azurewebsites.net/register",
            registerData
          )
          .then((response) => {
            alert("Utworzono konto nowego użytkownika!")
            navigate("/")
            setRequestSent(false)
          });
  
      } catch (error) {
        alert("Coś poszło nie tak :(")
        console.error(error)
        setRequestSent(false)
        navigate("/")
      }
    }

  }

  return (
    <div onKeyDown={onKeyDown}>
      <Container>
        <h2 className="mt-5 primary text-center">Zarejestruj się</h2>
        <Row className="mt-5">
          <Col lg={6} md={6} sm={12} className="p-5 m-auto shadow rounded-lg">
            <Form className="d-grid gap-2">
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control
                      type="text"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          name: `${e.target.value}`,
                        })
                      }
                      isInvalid={submit && validationSet.nameErr}
                    />
                    <Form.Control.Feedback type="invalid">
                      Podaj imię.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3" controlId="surname">
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control
                      type="text"
                      value={registerData.surname}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          surname: `${e.target.value}`,
                        })
                      }
                      isInvalid={submit && validationSet.surnameErr}
                    />
                    <Form.Control.Feedback type="invalid">
                      Podaj nazwisko.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="pesel">
                <Form.Label>PESEL</Form.Label>
                <Form.Control
                  type="text"
                  value={registerData.pesel}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      pesel: `${e.target.value}`,
                    })
                  }
                  isInvalid={submit && validationSet.peselErr}
                />
                <Form.Control.Feedback type="invalid">
                  Podaj poprawny PESEL.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="streetAddress">
                <Form.Label>Adres zamieszkania</Form.Label>
                <Form.Control
                  type="text"
                  value={registerData.streetAddress}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      streetAddress: `${e.target.value}`,
                    })
                  }
                  isInvalid={submit && validationSet.streetAddressErr}
                />
                <Form.Control.Feedback type="invalid">
                  Podaj adres zamieszkania.
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="hometown">
                    <Form.Label>Miasto</Form.Label>
                    <Form.Control
                      type="text"
                      value={registerData.hometown}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          hometown: `${e.target.value}`,
                        })
                      }
                      isInvalid={submit && validationSet.hometownErr}
                    />
                    <Form.Control.Feedback type="invalid">
                      Podaj miasto.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group className="mb-3" controlId="postalCode">
                    <Form.Label>Kod pocztowy</Form.Label>
                    <Form.Control
                      type="text"
                      value={registerData.postalCode}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          postalCode: `${e.target.value}`,
                        })
                      }
                      isInvalid={submit && validationSet.postalCodeErr}
                    />
                    <Form.Control.Feedback type="invalid">
                      Podaj poprawny kod.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="userEmail">
                <Form.Label>Adres email</Form.Label>
                <Form.Control
                  type="email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: `${e.target.value}`,
                    })
                  }
                  isInvalid={submit && validationSet.emailErr}
                />
                <Form.Control.Feedback type="invalid">
                  Podaj poprawny email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Hasło</Form.Label>
                <Form.Control
                  type="password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: `${e.target.value}`,
                    })
                  }
                  isInvalid={submit && validationSet.passwordErr}
                />
                <Form.Control.Feedback type="invalid">
                  Hasło powinno posiadać minimum 8 znaków w tym małą i dużą literę, cyfrę oraz znak specjalny.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Powtórz hasło</Form.Label>
                <Form.Control
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      confirmPassword: `${e.target.value}`,
                    })
                  }
                  isInvalid={submit && validationSet.confirmPasswordErr}
                />
                <Form.Control.Feedback type="invalid">
                  Hasła muszą być takie same.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" onClick={handleRegister}>
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
                  "Zarejestruj się"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterPage;
