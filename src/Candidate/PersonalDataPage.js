import React, { useEffect, useState } from "react";
import { ContentWrapper } from './PersonalDataPageStyled';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { defaultPersonalData } from "../DefaultData/DefaultPersonalData";
import LoadingIcon from "../Graphic/Load_White.png";
import { LoadingIconWrapper, ButtonIconWrapper } from "../Graphic/IconsStyled";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function PersonalData({ userId }) {

    const [data, setData] = useState(defaultPersonalData);
    const [isRequestSent, setRequestSent] = useState(false);

    async function handleGetUser() {
        try {
            await axios.get("https://dev-tabrnirs-be-app.azurewebsites.net/user").then(
                response => {
                    setData({
                        userId: `${response.data.userId}`,
                        email: `${response.data.email}`,
                        name: `${response.data.name}`,
                        surname: `${response.data.surname}`,
                        pesel: `${response.data.pesel}`,
                        hometown: `${response.data.hometown}`,
                        streetAddress: `${response.data.streetAddress}`,
                        postalCode: `${response.data.postalCode}`
                    })
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function handlePutUser() {
        setRequestSent(true);
        try {
            await axios.put("https://dev-tabrnirs-be-app.azurewebsites.net/user", data).then(
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

    useEffect(() => {
        if(userId !== "") {
            handleGetUser()
        }
    }, [userId]);

    return(
        <ContentWrapper>
        <Form.Group className="d-grid gap-4">

            <Form.Group size="lg" controlId="name">
                <Form.Label>Imiona</Form.Label>
                <Form.Control
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({...data, name: `${e.target.value}`})}
                />
            </Form.Group>

            <Form.Group size="lg" controlId="surname">
                <Form.Label>Nazwisko</Form.Label>
                <Form.Control
                  type="text"
                  value={data.surname}
                  onChange={(e) => setData({...data, surname: `${e.target.value}`})}
                />
            </Form.Group>

            <Form.Group size="lg" controlId="pesel">
                <Form.Label>PESEL</Form.Label>
                <Form.Control
                  type="text"
                  value={data.pesel}
                  disabled
                />
            </Form.Group>

            <Form.Group size="lg" controlId="streetAddress">
                <Form.Label>Adres zamieszkania</Form.Label>
                <Form.Control
                  type="text"
                  value={data.streetAddress}
                  onChange={(e) => setData({...data, streetAddress: `${e.target.value}`})}
                />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group size="lg" controlId="hometown">
                        <Form.Label>Miasto</Form.Label>
                        <Form.Control
                        type="text"
                        value={data.hometown}
                        onChange={(e) => setData({...data, hometown: `${e.target.value}`})}
                        />
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group size="lg" controlId="postalCode">
                        <Form.Label>Kod pocztowy</Form.Label>
                        <Form.Control
                        type="text"
                        value={data.postalCode}
                        onChange={(e) => setData({...data, postalCode: `${e.target.value}`})}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group size="lg" controlId="email">
                <Form.Label>Adres email</Form.Label>
                <Form.Control
                  type="text"
                  value={data.email}
                  onChange={(e) => setData({...data, email: `${e.target.value}`})}
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