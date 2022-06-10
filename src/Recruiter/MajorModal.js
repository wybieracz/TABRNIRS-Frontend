import React, { useEffect, useState } from "react";
import { Container, Form, Modal, Button, Row, Col } from "react-bootstrap";
import { defaultMajorData } from "../DefaultData/DefaultMajorData";
import { ButtonIconWrapper, LoadingIconWrapper } from "../Graphic/IconsStyled";
import LoadingIcon from "../Graphic/Load_White.png";
import "../BootstrapCustom.css";
import { defaultDate, getDays, getMonthNumber, years, months, hours, minutes } from "../DefaultData/DefaultDate";
import { RatioWrapper } from "./MajorsPageStyled";
import axios from "axios";

export default function MajorModal({ show, onHide, faculties, subjects, handleGetSubjects }) {

  const [isRequestSent, setIsRequestSent] = useState(false);
  const [data, setData] = useState(defaultMajorData);
  const [date, setDate] = useState(defaultDate);
  const [days, setDays] = useState(getDays("1", "2022"));
  const [ratio, setRatio] = useState(0.5);
  const [subjectsReduced, setSubjectsReduced] = useState(getSubjectsReduced())

  function getSubjectsReduced() {
    return subjects.reduce((reduced, element) => {
      if(element.includes("PR")) {
        reduced.push({subject: element, active: false})
      }
      return reduced;
    }, [])
  }

  function getSubjectsActive() {
    return subjectsReduced.reduce((reduced, element) => {
      if(element.active) {
        reduced.push(element.subject)
      }
      return reduced;
    }, [])
  }

  function getActiveNumber() {
    let count = 0;
    subjectsReduced.forEach(element => {
      if(element.active) count++
    })
    return count;
  }

  function setActive(index, active, subject) {

    const editedElement = {subject: subject, "active": active};
    const result = Array.from(subjectsReduced);

    result.splice(index, 1, editedElement)
    setSubjectsReduced(result)
}

  function onHideExtended() {
    onHide()
    setData(defaultMajorData)
    setDate(defaultDate)
    setDays(getDays("1", "2022"))
    setRatio(0.5)
    setSubjectsReduced(getSubjectsReduced())
  }

  function countPR() {
    const temp = subjects.filter(element => element.includes("PR"));
    return temp.length
  }

  async function handlePostApp() {

    let specialization = {};
    const count = getActiveNumber();
    const activeSubjects = getSubjectsActive();
    const arr = Array(count);

    const payload = {
      ...data,
      formula: `${ratio} * PB + ${1 - ratio} * PD`,
      recruitationDate: `${date.year}-${getMonthNumber(date.month)}-${date.day}T${date.hour}:${date.minutes}:00.000Z`
    };

    setIsRequestSent(true)
    try {
      
      await axios.post("https://dev-tabrnirs-be-app.azurewebsites.net/spec", payload)

      await axios
      .get(`https://dev-tabrnirs-be-app.azurewebsites.net//faculty/specs/${payload.facultyName}`)
      .then((response) => {
        specialization = response.data.find(element => element.specializationName === payload.specializationName)
      })

      for(let i = 0; i < count; i++) {

        const subjectPayload = {
          specializationId: specialization.specializationId,
          specializationName: specialization.specializationName,
          subject: activeSubjects[i]
        }

        arr[i] = axios.post("https://dev-tabrnirs-be-app.azurewebsites.net/spec/subj", subjectPayload);
      }

        Promise.all(arr)
          .then((values) => {
            setIsRequestSent(false)
            handleGetSubjects()
            onHideExtended()
            alert("Poprawnie dodano nowy kierunek!")}
          )
          .catch((values) => {
            console.error(values)
            onHideExtended();
            setIsRequestSent(false)
            alert("Coś poszło nie tak :(")}
          );
    } catch (error) {
      console.error(error);
      onHideExtended();
      alert("Coś poszło nie tak :(");
      setIsRequestSent(false);
    }
  }

  useEffect(() => {
    setDays(getDays(date.month, date.year));
    if(!days.includes(date.day)) setDate({ ...date, day: "1" })
  }, [date.month, date.year, days]);

  useEffect(() => {
    setSubjectsReduced(getSubjectsReduced())
  }, [subjects])

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
              value={data.facultyName}
              onChange={(e) => setData({ ...data, facultyName: e.target.value })}
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
                setData({ ...data, specializationName: e.target.value })
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
                  {subjectsReduced
                  .slice(0, Math.ceil(countPR() / 2))
                  .map((element, index) => (
                      <Form.Check className="mt-2"
                      key={index}
                      aria-label="option 1"
                      label={element.subject}
                      checked={element.active}
                      onChange={(e) => setActive(index, e.target.checked, element.subject)}
                      />
                  ))}
                </Container>
              </Col>

              <Col>
                <Container >
                  {subjectsReduced
                  .slice(-(Math.floor(countPR() / 2)))
                  .map((element, index) => (
                      <Form.Check className="mt-2"
                      key={index}
                      aria-label="option 1"
                      label={element.subject}
                      checked={element.active}
                      onChange={(e) => setActive(index + countPR() / 2, e.target.checked, element.subject)}
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
                      basePointReq: parseInt(e.target.value),
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
                      spotCount: parseInt(e.target.value),
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
