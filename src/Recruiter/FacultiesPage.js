import React, { useState } from "react";
import { ContentWrapper } from './FacultiesPageStyled';
import { Button, Accordion } from 'react-bootstrap';
import FacultyDeleteModal from "./FacultiesDeleteModal";
import FacultyAddModal from "./FacultiesAddModal";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Faculties({ userId, faculties, setFaculties }) {

    const [deleteFaculty, setDeleteFaculty] = useState("");
    const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
    const [isAddModalActive, setIsAddModalActive] = useState(false);

    function handleOpenDeleteModal(name) {
        setDeleteFaculty(name)
        setIsDeleteModalActive(true)
    }

    return(
        <ContentWrapper>
        <p className="fw-bold text-start fs-4">Wydziały</p>
        <Accordion>
          {faculties.map((element, index) => {
            return (
              <Accordion.Item key={index} eventKey={index}>
                <Accordion.Header>{element}</Accordion.Header>
                <Accordion.Body>
                <Button
                    variant="link"
                    onClick={() => handleOpenDeleteModal(element)}
                >
                    Usuń
                </Button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
        <Button className="mt-4" onClick={setIsAddModalActive}>
          Dodaj wydział
        </Button>
        
        <FacultyDeleteModal 
            show={isDeleteModalActive}
            onHide={() => setIsDeleteModalActive(false)}
            faculty={deleteFaculty}
            faculties={faculties}
            setFaculties={setFaculties}
        />

        <FacultyAddModal 
            show={isAddModalActive}
            onHide={() => setIsAddModalActive(false)}
            userId={userId}
            faculties={faculties}
            setFaculties={setFaculties}
        />
      </ContentWrapper>
    );
}