import React, { useState } from "react";
import { ContentWrapper } from './FacultiesPageStyled';
import { Button, Row, Col, Form } from 'react-bootstrap';
import FacultyModal from "./FacultiesModal";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Faculties({ userId, faculties, setFaculties }) {

    const [faculty, setFaculty] = useState("");
    const [deleteFaculty, setDeleteFaculty] = useState("");
    const [isInputActive, setIsInputActive] = useState(true);
    const [isModalActive, setIsModalActive] = useState(false);

    async function handlePostFaculty() {

        if(faculty) {
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
        else {
            alert("Podaj nazwę wydziału!")
        }      
    }

    function handleOpenModal(name) {
        setDeleteFaculty(name)
        setIsModalActive(true)
    }

    return(
        <>
        <ContentWrapper>
        <Form.Group className="d-grid gap-4">

            {faculties.map((element, index) => {
                return(
                    <Row key={index}>
                        <Col md="auto">
                            <Button variant="danger" onClick={() => handleOpenModal(element)}>Usuń</Button>
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

        <FacultyModal 
        show={isModalActive}
        onHide={() => setIsModalActive(false)}
        faculty={deleteFaculty}
        faculties={faculties}
        setFaculties={setFaculties}
        />
        </>
    );
}