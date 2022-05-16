import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap';
import { AppsContentWrapper, ButtonWrapper, Separator } from './ApplicationsPageStyled';
import { OkIcon, NoIcon } from '../Graphic/Icons'
import { StatusIcon } from './ApplicationsPageStyled'

const Raspberry = "#D8002A";
const Green = "#53A548";
const Blue = "#0B5ED7";

const temp = [{
    "course": "Informatyka",
    "department": "Wydział Autoamtyki, Elektroniki i Informatyki",
    "status": "Zaakceptowano"
},
{
    "course": "Informatics",
    "department": "Wydział Autoamtyki, Elektroniki i Informatyki",
    "status": "Odrzucono"
},
{
    "course": "Teleinfotrmatyka",
    "department": "Wydział Autoamtyki, Elektroniki i Informatyki",
    "status": "Czeka na decyzję"
}]

function handleClick() {
    console.log(temp)
}

function test(num) {
    console.log(num)
}

export default function Applications() {
    return(
        <>
        <AppsContentWrapper>
        <Container fluid className="px-0">
            {temp.map((element, index) => (
                <div key={index}>
                <Row className="p-4" onClick={()=>test(index)}>
                    <Col className="text-start"><b>{element.course}</b></Col>
                    <Col className="text-center">{element.department}</Col>
                    <Col className="text-end vertical-align-middle">{
                        element.status === "Zaakceptowano" ? 
                            <><StatusIcon background={Green} disabled>
                                <OkIcon />
                            </StatusIcon>
                            {element.status}</>
                        : (
                            element.status === "Odrzucono" ?
                                <><StatusIcon background={Raspberry} disabled>
                                    <NoIcon />
                                </StatusIcon>
                                {element.status}</>
                            :
                            <><StatusIcon background={Blue} disabled>
                                <OkIcon />
                            </StatusIcon>
                            {element.status}</>
                        )
                    }</Col>
                </Row>
                {temp.length > index + 1 ? <Separator /> : null}
                </div>
            ))}
        </Container>
        </AppsContentWrapper>
        <ButtonWrapper>
            <Button className="btn-primary btn-lg" onClick={handleClick}>Nowe podanie</Button>
        </ButtonWrapper>
        </>
    );
}