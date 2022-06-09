import React, { useEffect, useState } from "react";
import { ContentWrapper } from "./FacultiesPageStyled";
import { Button, Row, Col, Form } from "react-bootstrap";
import LoadingIcon from "../Graphic/Load_White.png";
import { LoadingIconWrapper, ButtonIconWrapper } from "../Graphic/IconsStyled";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { getSpecs } from "../AppUtility";
import MajorModal from "./MajorModal";

axios.defaults.withCredentials = true;

export default function Majors({ userId, faculties, specializations, subjects, handleGetSubjects }) {
  //const [subjects, setSubjects] = useState([]);
  //const [specs, setSpecs] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  // useEffect(() => {
  //   const exec = async () => {
  //     const facultySpecs = await Promise.all(
  //       faculties.map((faculty) => {
  //         console.log(faculty);
  //         return axios.get(
  //           `https://dev-tabrnirs-be-app.azurewebsites.net/faculty/specs/${faculty}`
  //         );
  //       })
  //     );

  //     facultySpecs.map((faculty) => {
  //       const specsArray = [];
  //       if (faculty.data.length === 0) {
  //         specsArray.push("Brak kierunków do wyświetlenia");
  //       } else {
  //         faculty.data.map((facultySpecs) => {
  //           console.log(facultySpecs.specializationName);
  //           specsArray.push(facultySpecs.specializationName);
  //         });
  //       }
  //       setSpecs((specs) => [...specs, specsArray]);
  //     });
  //   };
  //   exec();
  // }, [faculties]);

  function handleClick() {
    setIsModalActive(true);
  }

  // async function handleGetSubjects() {
  //   try {
  //     await axios
  //       .get("https://dev-tabrnirs-be-app.azurewebsites.net/subjects")
  //       .then((response) => {
  //         setSubjects(response.data);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   handleGetSubjects();
  // }, []);

  return (
    <ContentWrapper>
      <p className="fw-bold text-start fs-4">Kierunki</p>
      <Accordion>
        {faculties.map((element, index) => {
          return (
            <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header>{element}</Accordion.Header>
              <Accordion.Body>
                {specializations.length === 0 ?
                  <div>Brak przedmiotów</div>
                : 
                  specializations.map((subElement, subIndex) => {
                    return (
                      element === subElement.facultyName ?
                        <div key={subIndex}>{subElement.specializationName}</div>
                      :
                        null
                    )
                })}
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
        handleGetSubjects={handleGetSubjects}
      />
    </ContentWrapper>
  );
}
