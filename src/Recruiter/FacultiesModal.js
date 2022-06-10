import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { ButtonIconWrapper, LoadingIconWrapper } from "../Graphic/IconsStyled";
import LoadingIcon from "../Graphic/Load_White.png";
import "../BootstrapCustom.css";
import axios from "axios";

export default function FacultyModal({ show, onHide, faculty, faculties, setFaculties }) {

    const [isRequestSent, setIsRequestSent] = useState(false);

    async function handleDeleteFaculty() {

        setIsRequestSent(true)

        try {
            await axios.delete(`https://dev-tabrnirs-be-app.azurewebsites.net/faculty/${faculty}`).then(
                response => {

                    const temp = faculties.filter(element => !(element === faculty));
                    setFaculties(temp)
                    setIsRequestSent(false)
                    onHide()
                    alert("Usunięto wydział!")
                }
            );
        } catch (error) {
            console.error(error);
            setIsRequestSent(false)
            alert("Coś poszło nie tak :(")
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
            Usuń wydział
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {`Czy jesteś pewien, że chcesz usunąć ${faculty}? Będzie skutkować usunięciem wszystkich kierunków oraz aplikacji z danego wydziału!`} 
        </Modal.Body>

        <Modal.Footer  className="d-grid gap-4">

                <Button className="mx-7" variant="danger" onClick={handleDeleteFaculty}>{ isRequestSent
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