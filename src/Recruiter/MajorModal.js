import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { defaultMajorData } from "../DefaultData/DefaultMajorData";
import { ButtonIconWrapper, LoadingIconWrapper } from "../Graphic/IconsStyled";
import LoadingIcon from "../Graphic/Load_White.png";
import "../BootstrapCustom.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MajorModal({ show, onHide, faculties, subjects }) {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [data, setData] = useState(defaultMajorData);
  const [startDate, setStartDate] = useState(new Date());

  async function handlePostApp() {
    const payload = {
      specializationName: data.specializationName,
      facultyName: data.facultyName,
      basePointReq: data.basePointReq,
      baseSubject: {
        subject: data.baseSubject.subject,
      },
      formula: data.formula,
      spotCount: data.spotCount,
      recruitationDate: data.recruitationDate,
    };

    setIsRequestSent(true);
    try {
      await axios
        .post("https://dev-tabrnirs-be-app.azurewebsites.net/spec", payload)
        .then((response) => {
          //handleGetApps();
          onHide();
          alert("Pomyślnie dodano nowy kierunek!");
          setIsRequestSent(false);
        });
    } catch (error) {
      console.error(error);
      onHide();
      alert("Coś poszło nie tak :(");
      setIsRequestSent(false);
    }
  }

  function onHideExtended() {
    onHide();
    setData({ ...data, faculty: "" });
  }

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
        <Modal.Title id="contained-modal-title-vcenter">
          Nowy kierunek
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="d-grid gap-4">
          <Form.Group size="lg" controlId="facultyName">
            <Form.Label>Wydział</Form.Label>
            <Form.Select
              value={data.faculty}
              onChange={(e) => setData({ ...data, faculty: e.target.value })}
            >
              <option value=""></option>
              {faculties.map((element, index) => (
                <option value={element} key={index}>
                  {element}
                </option>
              ))}
            </Form.Select>

            <Form.Label>Nazwa kierunku</Form.Label>
            <Form.Control
              type="text"
              value={data.specializationName}
              onChange={(e) =>
                setData({
                  ...data,
                  specializationName: `${e.target.value}`,
                })
              }
            />

            <Form.Label>Przedmiot podstawowy</Form.Label>
            <Form.Select
              value={data.baseSubject.subject}
              onChange={(e) =>
                setData({ ...data, baseSubject: { subject: e.target.value } })
              }
            >
              <option value=""></option>
              {subjects.map((element, index) => (
                <option value={element} key={index}>
                  {element}
                </option>
              ))}
            </Form.Select>

            <Form.Label>Wymagana liczba punktów</Form.Label>
            <Form.Control
              type="text"
              value={data.basePointReq}
              onChange={(e) =>
                setData({
                  ...data,
                  basePointReq: `${e.target.value}`,
                })
              }
            />

            <Form.Label>Liczba miejsc</Form.Label>
            <Form.Control
              type="text"
              value={data.spotCount}
              onChange={(e) =>
                setData({
                  ...data,
                  spotCount: `${e.target.value}`,
                })
              }
            />

            <Form.Label>Data zakończenia rekrutacji</Form.Label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setData({
                  ...data,
                  recruitationDate: date.toUTCString(),
                });
              }}
            />
            {console.log(data)}
          </Form.Group>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="d-grid gap-4">
        <Button className="mx-7" variant="primary" onClick={handlePostApp}>
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
