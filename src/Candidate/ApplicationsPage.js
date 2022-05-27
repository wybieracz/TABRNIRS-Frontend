import React, { useEffect, useState } from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap';
import { AppsContentWrapper, ButtonWrapper, Separator } from './ApplicationsPageStyled';
import ApplicationStatusIcon from './ApplicationStatusIcon';
import ApplicationModal from './ApplicationModal';
import axios from 'axios';

function test(num) {
    console.log(num)
}

export default function Applications({ recruitmentData, apps, handleGetApps }) {

    const [isModalActive, setIsModalActive] = useState(false);
    const [faculties, setFaculties] = useState([""]);
    const [specs, setSpesc] = useState([]);
    //const [apps, setApps] = useState([]);

    async function handleGetFaculties() {
        try {
            await axios.get("https://dev-tabrnirs-be-app.azurewebsites.net/faculties").then(
                response => {
                    let temp = response.data.map(element => {return element.facultyName});
                    temp.unshift("")
                    setFaculties(temp)
                }
            );
        } catch (error) {
            console.error(error);
        }
    }
    
    async function handleGetSpecs() {
        try {
            await axios.get("https://dev-tabrnirs-be-app.azurewebsites.net/specs/subjects").then(
                response => {
                    setSpesc(response.data)
                }
            );
        } catch (error) {
            console.error(error);
        }
    }

    function handleClick() {
        setIsModalActive(true);
    }

    useEffect(() => {
        handleGetFaculties()
        handleGetSpecs()
    }, []);

    return(
        <>
        <AppsContentWrapper>
        <Container fluid className="px-0">
            {apps.map((element, index) => (
                <div key={index}>
                <Row className="p-4" onClick={()=>test(index)}>
                    <Col className="text-start"><b>{element.specializationName}</b></Col>
                    <Col className="text-center">-</Col>
                    <Col className="text-end vertical-align-middle"><ApplicationStatusIcon status={element.status} /></Col>
                </Row>
                {apps.length > index + 1 ? <Separator /> : null}
                </div>
            ))}
        </Container>
        </AppsContentWrapper>
        <ButtonWrapper>
            <Button className="btn-primary btn-lg" onClick={handleClick}>Nowe podanie</Button>
        </ButtonWrapper>

        <ApplicationModal
            show={isModalActive}
            onHide={() => setIsModalActive(false)}
            faculties={faculties}
            specs={specs}
            recruitmentData={recruitmentData}
            handleGetApps={handleGetApps}
        />
        </>
    );
}