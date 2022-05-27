import React, { useState } from "react";
import { ContentWrapper } from './PersonalDataPageStyled';
import { Button, Row, Col, Form } from 'react-bootstrap';
import LoadingIcon from "../Graphic/Load_White.png";
import { LoadingIconWrapper, ButtonIconWrapper } from "../Graphic/IconsStyled";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function PersonalData({ personalData, setPersonalData }) {

    const [isRequestSent, setRequestSent] = useState(false);

    async function handlePutUser() {
        setRequestSent(true);
        try {
            await axios.put("https://dev-tabrnirs-be-app.azurewebsites.net/user", personalData).then(
                response => {
                    alert("Pomyślnie zmieniono dane!")
                    setRequestSent(false)
                }
            );
        } catch (error) {
            console.error(error);
            alert("Coś poszło nie tak :(")
            setRequestSent(false)
        }
    }

    return(
        <ContentWrapper>
        <Form.Group className="d-grid gap-4">

            <Form.Group size="lg" controlId="name">
                <Form.Label>Imiona</Form.Label>
                <Form.Control
                  type="text"
                  value={personalData.name}
                  onChange={(e) => setPersonalData({...personalData, name: `${e.target.value}`})}
                />
            </Form.Group>

            <Form.Group size="lg" controlId="surname">
                <Form.Label>Nazwisko</Form.Label>
                <Form.Control
                  type="text"
                  value={personalData.surname}
                  onChange={(e) => setPersonalData({...personalData, surname: `${e.target.value}`})}
                />
            </Form.Group>

            <Form.Group size="lg" controlId="pesel">
                <Form.Label>PESEL</Form.Label>
                <Form.Control
                  type="text"
                  value={personalData.pesel}
                  disabled
                />
            </Form.Group>

            <Form.Group size="lg" controlId="streetAddress">
                <Form.Label>Adres zamieszkania</Form.Label>
                <Form.Control
                  type="text"
                  value={personalData.streetAddress}
                  onChange={(e) => setPersonalData({...personalData, streetAddress: `${e.target.value}`})}
                />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group size="lg" controlId="hometown">
                        <Form.Label>Miasto</Form.Label>
                        <Form.Control
                        type="text"
                        value={personalData.hometown}
                        onChange={(e) => setPersonalData({...personalData, hometown: `${e.target.value}`})}
                        />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group size="lg" controlId="postalCode">
                        <Form.Label>Kod pocztowy</Form.Label>
                        <Form.Control
                        type="text"
                        value={personalData.postalCode}
                        onChange={(e) => setPersonalData({...personalData, postalCode: `${e.target.value}`})}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group size="lg" controlId="email">
                <Form.Label>Adres email</Form.Label>
                <Form.Control
                  type="text"
                  value={personalData.email}
                  onChange={(e) => setPersonalData({...personalData, email: `${e.target.value}`})}
                />
            </Form.Group>
            
            <Button variant="primary" onClick={() => handlePutUser()}>{ isRequestSent
                  ? <ButtonIconWrapper>
                      <LoadingIconWrapper size="20px">
                        <img src={LoadingIcon} alt="LoadingIcon" width="20px" heigth="20px" />
                      </LoadingIconWrapper>
                    </ButtonIconWrapper>
                  : "Zapisz"
                }</Button>
        </Form.Group>
        </ContentWrapper>
    );
}