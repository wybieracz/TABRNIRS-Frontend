import React, { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import {
  AppsContentWrapper,
  ButtonWrapper,
  Separator,
} from "./ApplicationsPageStyled";
import ApplicationStatusIcon from "./ApplicationStatusIcon";
import ApplicationModal from "./ApplicationModal";

function test(num) {
  console.log(num);
}

export default function Applications({
  recruitmentData,
  apps,
  handleGetApps,
  faculties,
  specializations,
}) {
  const [isModalActive, setIsModalActive] = useState(false);

  function handleClick() {
    setIsModalActive(true);
  }

  function getSpecializationData(specializationId) {
    return specializations.find(
      (element) => element.specializationId === specializationId
    );
  }

  return (
    <>
      {apps.length > 0 ? (
        <AppsContentWrapper>
          <Container fluid className="px-0">
            {apps.length
              ? apps.map((element, index) => (
                  <div key={index}>
                    <Row className="p-4" onClick={() => test(index)}>
                      <Col className="text-start">
                        <b>
                          {
                            getSpecializationData(element.specializationId)
                              .specializationName
                          }
                        </b>
                      </Col>
                      <Col className="text-center">
                        {
                          getSpecializationData(element.specializationId)
                            .facultyName
                        }
                      </Col>
                      <Col className="text-end vertical-align-middle">
                        <ApplicationStatusIcon status={element.status} />
                      </Col>
                    </Row>
                    {apps.length > index + 1 ? <Separator /> : null}
                  </div>
                ))
              : null}
          </Container>
        </AppsContentWrapper>
      ) : null}
      <ButtonWrapper>
        <Button className="btn-primary btn-lg" onClick={handleClick}>
          Nowe podanie
        </Button>
      </ButtonWrapper>

      <ApplicationModal
        show={isModalActive}
        onHide={() => setIsModalActive(false)}
        faculties={faculties}
        specs={specializations}
        recruitmentData={recruitmentData}
        handleGetApps={handleGetApps}
      />
    </>
  );
}
