import React, { useRef, useState, useEffect } from "react";
import {
  ContentWrapper,
  AppsContentWrapper,
  ButtonWrapper,
  Separator,
} from "./RecruiterApplicationsPageStyled";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { defaultRecruiterApplicationSearchData } from "../DefaultData/DefaultRecruiterApplicationSearchData";
import { defaultApplicationData } from "../DefaultData/DefaultApplicationData";

import ApplicationStatusIcon from "../Candidate/ApplicationStatusIcon";
import axios from "axios";
import EditApplicationModal from "./EditApplicationModal";
import {
  defaultDate,
  getDays,
  getMonthNumber,
  years,
  months,
  hours,
  minutes,
} from "../DefaultData/DefaultDate";
axios.defaults.withCredentials = true;

export default function RecruiterApplications({
  faculties,
  specializations,
  users,
  handleGetApps,
}) {
  const [data, setData] = useState(defaultRecruiterApplicationSearchData);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isSearchSuccess, setIsSearchSuccess] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isStartRecrutationActive, setIsStartRecrutationActive] =
    useState(false);
  const [usersApps, setUsersApps] = useState([]);
  const [majorDetails, setMajorDetails] = useState(
    defaultRecruiterApplicationSearchData
  );
  const [applicationToEdit, setApplicationToEdit] = useState();
  const [date, setDate] = useState(defaultDate);
  const [days, setDays] = useState(getDays("1", "2022"));

  function handleEditApplication(application) {
    setApplicationToEdit(application);
  }

  function handleStartRecrutationStatus() {
    setIsStartRecrutationActive(!isStartRecrutationActive);
  }

  async function handleStartRecrutation() {
    const payload = {
      specializationId: data.major,
      recruitationDate: `${date.year}-${getMonthNumber(date.month)}-${
        date.day
      }T${date.hour}:${date.minutes}:00.000Z`,
    };

    setIsRequestSent(true);
    try {
      await axios
        .put(`https://dev-tabrnirs-be-app.azurewebsites.net/spec`, payload)
        .then((response) => {
          handleGetApps();
          alert("Pomyślnie rozpoczęto nową turę rekrutacji!");
          setMajorDetails({
            ...majorDetails,
            recrutationDate: payload.recruitationDate,
          });
          setIsRequestSent(false);
          setIsStartRecrutationActive(false);
          setDate(defaultDate);
        });
    } catch (error) {
      console.error(error);
      alert("Coś poszło nie tak :(");
      setIsRequestSent(false);
    }
  }

  async function handleSearchClick() {
    specializations.map((element, index) => {
      return data.major === element.specializationId
        ? setMajorDetails({
            faculty: element.facultyName,
            major: element.specializationName,
            subjects: element.additionalSubjects,
            recrutationDate: element.recruitationDate,
          })
        : null;
    });

    try {
      await axios
        .get(
          `https://dev-tabrnirs-be-app.azurewebsites.net/spec/${data.major}/apps`
        )
        .then((response) => {
          setUsersApps(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleChangeStatus(userId, status) {
    const payload = {
      specializationId: data.major,
      candidateId: userId,
      status: status,
    };

    setIsRequestSent(true);
    try {
      await axios
        .put(
          `https://dev-tabrnirs-be-app.azurewebsites.net/app/status`,
          payload
        )
        .then((response) => {
          handleGetApps();
          alert("Pomyślnie zmieniono status podania!");
          setIsRequestSent(false);
          handleSearchClick();
        });
    } catch (error) {
      console.error(error);
      alert("Coś poszło nie tak :(");
      setIsRequestSent(false);
    }
  }

  async function handleEndRecrutation() {
    const payload = {
      specializationId: data.major,
      specializationName: majorDetails.major,
      facultyName: data.faculty,
    };

    setIsRequestSent(true);
    try {
      await axios
        .patch(`https://dev-tabrnirs-be-app.azurewebsites.net/spec`, payload)
        .then((response) => {
          handleGetApps();
          alert(
            `Pomyślnie zakończono rekrutację na kierunek: ${majorDetails.major}, ${data.faculty}!`
          );
          setIsRequestSent(false);
          handleSearchClick();
        });
    } catch (error) {
      console.error(error);
      alert("Coś poszło nie tak :(");
      setIsRequestSent(false);
    }
  }

  useEffect(() => {
    setIsSearchSuccess(true);
    console.log(isSearchSuccess);
    console.log(usersApps);
  }, []);

  const [noOfRender, setNoOfRender] = useState(0);

  useEffect(() => {
    if (noOfRender < 1) {
      setNoOfRender(noOfRender + 1);
    } else {
      if (applicationToEdit !== "") {
        setIsModalActive(true);
      }
    }
    console.log(noOfRender);
  }, [applicationToEdit]);

  return (
    <>
      <ContentWrapper>
        <Form.Group className="d-grid gap-3">
          <Row>
            <Col>
              <Form.Group
                size="lg"
                controlId="facultyName"
                style={{ width: "200px" }}
              >
                <Form.Label>Wydział</Form.Label>
                <Form.Select
                  value={data.faculty}
                  onChange={(e) =>
                    setData({ ...data, faculty: e.target.value })
                  }
                >
                  <option value=""></option>
                  {faculties.length > 0
                    ? faculties.map((element, index) => (
                        <option value={element} key={index}>
                          {element}
                        </option>
                      ))
                    : null}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group size="lg" controlId="major">
                <Form.Label>Kierunek</Form.Label>
                <Form.Select
                  value={data.major}
                  onChange={(e) =>
                    setData({
                      ...data,
                      major: e.target.value,
                    })
                  }
                  disabled={!data.faculty}
                  style={{ width: "200px" }}
                >
                  <option value=""></option>
                  {specializations.length > 0
                    ? specializations.map((element, index) => {
                        return data.faculty === element.facultyName ? (
                          <option value={element.specializationId} key={index}>
                            {element.specializationName}
                            {console.log(element)}
                          </option>
                        ) : null;
                      })
                    : null}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Button className="mt-4" onClick={handleSearchClick}>
                Wyszukaj
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </ContentWrapper>

      {isSearchSuccess ? (
        usersApps.length ? (
          <AppsContentWrapper>
            <Row>
              <Col>
                {console.log(majorDetails.subjects)}
                <p className="fw-bold text-start fs-4 pt-3 px-4">
                  {majorDetails.major}
                </p>
                <p className="text-start fs-7 px-4">{majorDetails.faculty}</p>
                <p className="text-start fs-7 px-4">
                  Koniec tury rekrutacji:{" "}
                  {majorDetails.recrutationDate
                    .split(".")[0]
                    .replace("T", ", godz. ")}
                </p>
              </Col>

              <Col className="text-end px-5">
                <Button
                  className="mt-4 mx-4 justify-center"
                  onClick={() => handleStartRecrutationStatus()}
                >
                  Nowa tura
                </Button>
                <Button
                  className="mt-4 justify-center"
                  variant="success"
                  onClick={() => handleEndRecrutation()}
                >
                  Zakończ rekrutację
                </Button>
              </Col>
            </Row>

            {isStartRecrutationActive ? (
              <>
                <Separator className="mb-4" />
                <Form.Group className="d-grid gap-4 px-3 py-3">
                  <Row>
                    <Col>
                      <Form.Group size="lg" controlId="year">
                        <Form.Label className="px-1">Rok</Form.Label>
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
                        <Form.Label className="px-1">Miesiąc</Form.Label>
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
                        <Form.Label className="px-1">Dzień</Form.Label>
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
                        <Form.Label className="px-1">Godzina</Form.Label>
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
                        <Form.Label className="px-1">Minuty</Form.Label>
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
                  <Row>
                    <Col className="d-flex justify-content-end px-4 mx-2">
                      <Button
                        size="sm"
                        onClick={() => handleStartRecrutation()}
                      >
                        Zatwierdź datę
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </>
            ) : null}

            <Separator className="mb-4" />
            <AppsContentWrapper>
              <Container fluid className="px-0">
                {usersApps.map((element, index) => (
                  <div key={index}>
                    <Row className="p-4 d-flex align-items-center">
                      <Col xs={2} className="vertical-align-middle">
                        <ApplicationStatusIcon status={element.status} />
                      </Col>
                      <Col className="text-center">{index + 1}.</Col>
                      {users.map((user) => {
                        return user.userId === element.candidateId ? (
                          <>
                            <Col>
                              {user.name} {user.surname}
                            </Col>
                            <Col className="text-center">{user.pesel}</Col>
                            <Col>
                              {user.streetAddress}, {user.hometown}
                            </Col>
                            <Col className="text-center">
                              <b>PKT: {element.points}</b>
                            </Col>
                            <Col
                              xs={3}
                              className="text-end p-2 d-flex justify-content-center"
                            >
                              <Button
                                disabled={element.status !== 2 ? false : true}
                                className="mx-1"
                                variant="secondary"
                                size="sm"
                                onClick={() =>
                                  handleEditApplication(element, true)
                                }
                              >
                                Edytuj
                              </Button>
                              <Button
                                disabled={element.status === 2 ? false : true}
                                className="mx-1"
                                variant="success"
                                size="sm"
                                onClick={() =>
                                  handleChangeStatus(user.userId, 3)
                                }
                              >
                                Potwierdź
                              </Button>

                              <Button
                                disabled={element.status === 2 ? false : true}
                                className="mx-1"
                                variant="danger"
                                size="sm"
                                onClick={() =>
                                  handleChangeStatus(user.userId, 1)
                                }
                              >
                                Odrzuć
                              </Button>
                            </Col>
                          </>
                        ) : null;
                      })}
                    </Row>
                    {usersApps.length > index + 1 ? <Separator /> : null}
                  </div>
                ))}
              </Container>
            </AppsContentWrapper>
          </AppsContentWrapper>
        ) : (
          <AppsContentWrapper>
            {majorDetails.major !== undefined ? (
              <>
                <Row>
                  <Col>
                    <p className="fw-bold text-start fs-4 pt-3 px-4">
                      {majorDetails.major}
                    </p>
                    <p className="text-start fs-7 px-4">
                      {majorDetails.faculty}
                    </p>
                  </Col>
                </Row>
                <Separator className="mb-4" />
                <p className="text-start fs-7 px-4">
                  Brak podań na danym kierunku.
                </p>
              </>
            ) : (
              <Row>
                <Col>
                  {console.log(majorDetails.major)}
                  <p className="text-start fs-5 pt-3 px-4">
                    Wybierz wydział i kierunek, aby zobaczyć listę podań.
                  </p>
                </Col>
              </Row>
            )}
          </AppsContentWrapper>
        )
      ) : null}
      <EditApplicationModal
        show={isModalActive}
        onHide={() => {
          setIsModalActive(false);
          setApplicationToEdit("");
          handleSearchClick();
        }}
        handleSearchClick={handleSearchClick}
        application={applicationToEdit}
        handleDeleteData={setApplicationToEdit}
        users={users}
        subjects={majorDetails.subjects}
      />
    </>
  );
}
