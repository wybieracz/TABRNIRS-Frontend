import React, { useState } from "react";
import { ContentWrapper } from './FacultiesPageStyled';
import { Button, Row, Col, Form } from 'react-bootstrap';
import LoadingIcon from "../Graphic/Load_White.png";
import { LoadingIconWrapper, ButtonIconWrapper } from "../Graphic/IconsStyled";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Faculties({ userId, faculties, setFaculties }) {

    const [faculty, setFaculty] = useState("");
    const [isInputActive, setIsInputActive] = useState(true);

    async function handlePostFaculty() {

        const payload = {
            "name": faculty,
            "recruiterId": userId
        }

        setIsInputActive(false)

        try {
            await axios.post("https://dev-tabrnirs-be-app.azurewebsites.net/faculty", payload).then(
                response => {

                    let temp = faculties;
                    temp.push(faculty)
                    temp.sort()

                    alert("Pomyślnie dodano nowy wydział!")
                    setFaculties(temp)
                    setFaculty("")
                    setIsInputActive(true)
                }
            );
        } catch (error) {
            console.error(error);
            alert("Coś poszło nie tak :(")
            setIsInputActive(true)
        }
    }

    async function handleDeleteFaculty(name) {

        try {
            await axios.delete(`https://dev-tabrnirs-be-app.azurewebsites.net/faculty/${name}`).then(
                response => {

                    const temp = faculties.filter(element => element !== name)

                    alert("Usunięto wydział!")
                    setFaculties(temp)
                }
            );
        } catch (error) {
            console.error(error);
            alert("Coś poszło nie tak :(")
        }
    }

    return(
        <ContentWrapper>
        <Form.Group className="d-grid gap-4">

            {faculties.map((element, index) => {
                return(
                    <Row key={index}>
                        <Col md="auto">
                            <Button variant="danger" onClick={() => handleDeleteFaculty(element)}>Usuń</Button>
                        </Col>

                        <Col md={10}>
                            <Form.Group size="lg" controlId="postalCode">
                                <Form.Control
                                type="text"
                                value={element}
                                disabled
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                )
            })}

            <Row>
                <Col md="auto">
                    <Button variant="success"
                        onClick={handlePostFaculty}
                        disabled={!isInputActive}
                        >
                        Dodaj
                    </Button>
                </Col>

                <Col md={10}>
                    <Form.Group size="lg" controlId="postalCode">
                        <Form.Control
                        type="text"
                        value={faculty}
                        onChange={(e) => setFaculty(e.target.value)}
                        disabled={!isInputActive}
                        />
                    </Form.Group>
                </Col>
            </Row>

        </Form.Group>
        </ContentWrapper>
    );
}