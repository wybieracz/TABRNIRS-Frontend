import React, { useEffect, useState } from "react";
import { Container, Form, Modal, Button, Row, Col } from "react-bootstrap";
import { ButtonIconWrapper, LoadingIconWrapper } from "../Graphic/IconsStyled";
import LoadingIcon from "../Graphic/Load_White.png";
import { defaultEditApplicationData } from "../DefaultData/DefaultEditApplicationData";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function EditApplicationModal({
  show,
  onHide,
  handleSearchClick,
  application,
  handleDeleteData,
  users,
  subjects,
}) {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [data, setData] = useState(defaultEditApplicationData);
  const [candidateSubjects, setCandidateSubjects] = useState();

  function onHideExtended() {
    onHide();
  }

  async function handleEditApplication() {
    const payload = {
      specializationId: data.specializationId,
      candidateId: data.candidateId,
      chosenSubject: data.chosenSubject,
      baseSubjectResult: data.baseSubjectResult,
      chosenSubjectResult: data.chosenSubjectResult,
    };

    setIsRequestSent(true);

    try {
      await axios
        .put(`https://dev-tabrnirs-be-app.azurewebsites.net/app`, payload)
        .then((response) => {
          handleSearchClick();
          onHide();
          alert("Pomyślnie edytowano podanie!");
          setIsRequestSent(false);
        });
    } catch (error) {
      console.error(error);
      onHide();
      alert("Coś poszło nie tak :(");
      setIsRequestSent(false);
    }
  }

  async function getCandidateSubjects(candidateId) {
    try {
      await axios
        .get(
          `https://dev-tabrnirs-be-app.azurewebsites.net/result/candidate/${candidateId}`
        )
        .then((response) => {
          setCandidateSubjects(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }

  function getSubjectPoints(subject) {
    if (candidateSubjects !== undefined) {
      const temp = candidateSubjects.find(
        (element) => element.subject === subject
      );

      if (temp) return temp.points.toString();
      else return "0";
    }
  }

  useEffect(() => {
    if (application !== undefined) {
      setData({
        ...data,
        specializationId: application.specializationId,
        candidateId: application.candidateId,
        chosenSubject: application.chosenSubject,
      });
      getCandidateSubjects(application.candidateId);
    }
  }, [application]);

  useEffect(() => {
    if (candidateSubjects !== undefined) {
      setData({
        ...data,
        baseSubjectResult: getSubjectPoints(application.baseSubject),
        chosenSubjectResult: getSubjectPoints(application.chosenSubject),
      });
    }
  }, [candidateSubjects]);

  return (
    <Modal
      show={show}
      onHide={onHideExtended}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {console.log(candidateSubjects)}
        {console.log(data)}
        {console.log(application)}
        <Modal.Title id="contained-modal-title-vcenter">
          Edycja podania
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mx-3">
        {application === undefined
          ? null
          : users.map((user) => {
              return user.userId === application.candidateId ? (
                <>
                  <Form.Group className="d-grid gap-4">
                    <Row>
                      <p className="fs-5 fw-bold ">Dane kandydata</p>
                      <Col>
                        <p>
                          Imię i nazwisko: {user.name} {user.surname}
                        </p>
                        <p>
                          Adres: {user.streetAddress}, {user.hometown}
                        </p>
                        <p>PESEL: {user.pesel}</p>
                      </Col>
                      <Col>
                        <p>{application.faculty}</p>
                        <p>Kierunek: {application.specializationName}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group size="lg" controlId="candidateName">
                          <Form.Label>Przedmiot podstawowy</Form.Label>
                          <Form.Control
                            readOnly
                            type="text"
                            value={application.baseSubject}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group size="lg" controlId="candidateSurname">
                          <Form.Label>Przedmiot dodatkowy</Form.Label>
                          <Form.Select
                            disabled={!candidateSubjects}
                            type="text"
                            defaultValue={data.chosenSubject}
                            onChange={(e) =>
                              setData({
                                ...data,
                                chosenSubject: e.target.value,
                                chosenSubjectResult: getSubjectPoints(
                                  e.target.value
                                ),
                              })
                            }
                          >
                            {subjects.length > 0
                              ? subjects.map((element, index) => (
                                  <option value={element.subject} key={index}>
                                    {element
                                      ? `${
                                          element.subject
                                        } - ${getSubjectPoints(
                                          element.subject
                                        )}%`
                                      : null}
                                  </option>
                                ))
                              : null}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form.Group>
                </>
              ) : null;
            })}
      </Modal.Body>
      <Modal.Footer className="d-grid gap-4">
        <Button
          className="mx-7"
          variant="primary"
          onClick={handleEditApplication}
        >
          {isRequestSent ? (
            <ButtonIconWrapper>
              <LoadingIconWrapper size="20px">
                <img
                  src={LoadingIcon}
                  alt="LoadingIcon"
                  width="20px"
                  heigth="20px"
                />
              </LoadingIconWrapper>
            </ButtonIconWrapper>
          ) : (
            "Zatwierdź"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
