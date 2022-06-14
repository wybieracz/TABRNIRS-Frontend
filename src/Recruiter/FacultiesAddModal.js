import React, { useState } from "react";
import { Form, Modal, Button } from 'react-bootstrap';
import { ButtonIconWrapper, LoadingIconWrapper } from "../Graphic/IconsStyled";
import LoadingIcon from "../Graphic/Load_White.png";
import "../BootstrapCustom.css";
import axios from "axios";

export default function FacultyAddModal({ show, onHide, userId, faculties, setFaculties }) {

    const [isRequestSent, setIsRequestSent] = useState(false);
    const [faculty, setFaculty] = useState("");

    async function handlePostFaculty() {

        if(faculty) {

            const payload = {
                "name": faculty,
                "recruiterId": userId
            }
    
            setIsRequestSent(true)
    
            try {
    
                await axios.post("https://dev-tabrnirs-be-app.azurewebsites.net/faculty", payload).then(
                    response => {
    
                        let temp = faculties;
                        temp.push(faculty)
                        temp.sort()
                        
                        onHide()
                        alert("Pomyślnie dodano nowy wydział!")
                        setFaculties(temp)
                        setFaculty("")
                        setIsRequestSent(false)
                    }
                );
            } catch (error) {
                console.error(error);
                onHide()
                alert("Coś poszło nie tak :(")
                setFaculty("")
                setIsRequestSent(false)
            }
        }
        else {
            alert("Podaj nazwę wydziału!")
        }      
    }

    return (
        <Modal
        show={show}
        onHide={onHide}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Dodaj wydział
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Podaj nazwę nowego wydziału</p>
            <Form.Group size="lg" controlId="postalCode">
                <Form.Control
                type="text"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                disabled={isRequestSent}
                />
            </Form.Group>
        </Modal.Body>

        <Modal.Footer  className="d-grid gap-4">

                <Button className="mx-7" variant="primary" onClick={handlePostFaculty}>{ isRequestSent
                    ? <ButtonIconWrapper>
                        <LoadingIconWrapper size="20px">
                            <img src={LoadingIcon} alt="LoadingIcon" width="20px" heigth="20px" />
                        </LoadingIconWrapper>
                    </ButtonIconWrapper>
                    : "Zatwierdź"}
                </Button>

        </Modal.Footer>         
        </Modal>
    );
}