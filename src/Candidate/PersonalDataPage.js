import React, { useEffect, useState } from "react";
import { ContentWrapper } from '../Styled/ContentWrapperStyled';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { defaultPersonalData } from "../DefaultData/DefaultPersonalData";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function PersonalData({ userId }) {

    const [data, setData] = useState(defaultPersonalData);

    async function handleGetUser() {
        try {
            await axios.get("https://dev-tabrnirs-be-app.azurewebsites.net/user").then(
                response => {
                    setData({
                        ...data,
                        userId: `${response.data.userId}`,
                        name: `${response.data.name}`,
                        surname: `${response.data.surname}`,
                        pesel: `${response.data.pesel}`,
                        hometown: `${response.data.hometown}`,
                        streetAddress: `${response.data.streetAddress}`,
                        userEmail: `${response.data.userEmail}`
                    })
                }
            );
        } catch (error) {
            console.error(error);
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
                  onChange={(e) => setData({...data, pesel: `${e.target.value}`})}
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
                    <Form.Group size="lg" controlId="postcode">
                        <Form.Label>Kod pocztowy</Form.Label>
                        <Form.Control
                        type="text"
                        value={data.postcode}
                        onChange={(e) => setData({...data, postcode: `${e.target.value}`})}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group size="lg" controlId="userEmail">
                <Form.Label>Adres email</Form.Label>
                <Form.Control
                  type="text"
                  value={data.userEmail}
                  onChange={(e) => setData({...data, userEmail: `${e.target.value}`})}
                />
            </Form.Group>
            
            <Button variant="primary" onClick={() => console.log(data)}>Aktualizuj</Button>
        </Form.Group>
        </ContentWrapper>
    );
}