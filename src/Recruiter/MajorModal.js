import React, { useEffect, useState } from "react";
import { Container, Form, Modal, Button, Row, Col } from "react-bootstrap";
import { defaultMajorData } from "../DefaultData/DefaultMajorData";
import { ButtonIconWrapper, LoadingIconWrapper } from "../Graphic/IconsStyled";
import LoadingIcon from "../Graphic/Load_White.png";
import "../BootstrapCustom.css";
import { defaultDate, getDays, years, months, hours, minutes } from "../DefaultData/DefaultDate";
import { RatioWrapper } from "./MajorsPageStyled";
import axios from "axios";

export default function MajorModal({ show, onHide, faculties, subjects }) {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [data, setData] = useState(defaultMajorData);
  const [date, setDate] = useState(defaultDate);
  const [days, setDays] = useState(getDays("1", "2022"));
  const [ratio, setRatio] = useState(0.5);

  function countPR() {
    const temp = subjects.filter(element => element.includes("PR"));
    return temp.length
  }

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

  useEffect(() => {
    setDays(getDays(date.month, date.year));
    if(!days.includes(date.day)) setDate({ ...date, day: "1" })
  }, [date.month, date.year, days]);

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
          </Form.Group>

          <Form.Group size="lg" controlId="specializationName">
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
          </Form.Group>

          <Form.Group size="lg" controlId="baseSubject">
            <Form.Label>Przedmiot podstawowy</Form.Label>
            <Form.Select
              value={data.baseSubject.subject}
              onChange={(e) =>
                setData({ ...data, baseSubject: { subject: e.target.value } })
              }
            >
              <option value=""></option>
              {subjects
              .filter(element => element.includes("PP"))
              .map((element, index) => (
                <option value={element} key={index}>
                  {element}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group size="lg" controlId="baseSubject">
            <Form.Label>Przedmiot dodatkowy</Form.Label>
            <Row>
              <Col>
                <Container>
                  {subjects
                  .filter(element => element.includes("PR"))
                  .slice(0, Math.ceil(countPR() / 2))
                  .map((element, index) => (
                      <Form.Check className="mt-2"
                      key={index}
                      aria-label="option 1"
                      label={element}
                      checked={element.active}
                      onChange={(e) => console.log(index)}
                      />
                  ))}
                </Container>
              </Col>

              <Col>
                <Container >
                  {subjects
                  .filter(element => element.includes("PR"))
                  .slice(-(Math.ceil(countPR() / 2)))
                  .map((element, index) => (
                      <Form.Check className="mt-2"
                      key={index}
                      aria-label="option 1"
                      label={element}
                      checked={element.active}
                      onChange={(e) => console.log(index + countPR() / 2)}
                      />
                  ))}
                </Container>
              </Col>
            </Row>
            
          </Form.Group>

          <Form.Group size="lg" controlId="subjectsRate">
            <RatioWrapper>
              <p>Waga przedmiotu podstawowego: {ratio}</p>
              <p>Waga przedmiotu dodatkowego: {(1 - ratio).toFixed(1)}</p>
            </RatioWrapper>
            <Form.Range min="0.1" max="0.9" step="0.1"
              onChange={(e) => setRatio(e.target.value)} />
          </Form.Group>
          
          <Row>
            <Col>
              <Form.Group size="lg" controlId="basePointReq">
                <Form.Label>Wymagana liczba punktów</Form.Label>
                <Form.Control
                  type="number"
                  value={data.basePointReq}
                  max={200}
                  min={0}
                  onChange={(e) =>
                    setData({
                      ...data,
                      basePointReq: `${e.target.value}`,
                    })
                  }
                />
              </Form.Group>
            </Col>
          
            <Col>
              <Form.Group size="lg" controlId="spotCount">
                <Form.Label>Liczba miejsc</Form.Label>
                <Form.Control
                  type="number"
                  value={data.spotCount}
                  max={200}
                  min={10}
                  onChange={(e) =>
                    setData({
                      ...data,
                      spotCount: `${e.target.value}`,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group size="lg" controlId="year">
                <Form.Label>Rok</Form.Label>
                <Form.Select
                  value={date.year}
                  onChange={(e) =>
                    setDate({ ...date, year: e.target.value })
                  }
                >
                  {years.map((element, index) => (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          
            <Col>
              <Form.Group size="lg" controlId="month">
                <Form.Label>Miesiąc</Form.Label>
                <Form.Select
                  value={date.month}
                  onChange={(e) =>
                    setDate({ ...date, month: e.target.value })
                  }
                >
                  {months.map((element, index) => (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group size="lg" controlId="day">
                <Form.Label>Dzień</Form.Label>
                <Form.Select
                  value={date.day}
                  onChange={(e) =>
                    setDate({ ...date, day: e.target.value })
                  }
                >
                  {days.map((element, index) => (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group size="lg" controlId="hour">
                <Form.Label>Godzina</Form.Label>
                <Form.Select
                  value={date.hour}
                  onChange={(e) =>
                    setDate({ ...date, hour: e.target.value })
                  }
                >
                  {hours.map((element, index) => (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group size="lg" controlId="minutes">
                <Form.Label>Minuty</Form.Label>
                <Form.Select
                  value={date.minutes}
                  onChange={(e) =>
                    setDate({ ...date, minutes: e.target.value })
                  }
                >
                  {minutes.map((element, index) => (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

        </Form.Group>
      </Modal.Body>

      <Modal.Footer className="d-grid gap-4">
        <Button className="mx-7" variant="primary" onClick={() => console.log(date)}>
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
