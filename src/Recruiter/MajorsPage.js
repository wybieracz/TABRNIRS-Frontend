import React, { useState } from "react";
import { ContentWrapper } from "./FacultiesPageStyled";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import MajorModal from "./MajorModal";

axios.defaults.withCredentials = true;

export default function Majors({ userId, faculties, specializations, subjects, setSpecializations }) {

  const [isModalActive, setIsModalActive] = useState(false);

  function handleClick() {
    setIsModalActive(true);
  }

  return (
    <ContentWrapper>
      <p className="fw-bold text-start fs-4">Kierunki</p>
      <Accordion>
        {faculties.map((element, index) => {
          return (
            <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header>{element}</Accordion.Header>
              <Accordion.Body>
                {!specializations.find(subElement => element === subElement.facultyName) ?
                  <p>Brak przedmiotów</p>
                : 
                  <ul>
                  {specializations.map((subElement, subIndex) => {
                    return (
                      element === subElement.facultyName ?
                        <li key={subIndex}>{subElement.specializationName}</li>
                      :
                        null
                    )
                })}
                  </ul>
                }
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
      <Button className="mt-4" onClick={handleClick}>
        Dodaj kierunek
      </Button>
      <MajorModal
        show={isModalActive}
        onHide={() => setIsModalActive(false)}
        faculties={faculties}
        subjects={subjects}
        specializations={specializations}
        setSpecializations={setSpecializations}
      />
    </ContentWrapper>
  );
}
