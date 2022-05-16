import React, { useState } from "react";
import { ContentWrapper } from './PersonalDataPageStyled';
import { Button, Row, Col, Form } from 'react-bootstrap';
import LoadingIcon from "../Graphic/Load_White.png";
import { LoadingIconWrapper, ButtonIconWrapper } from "../Graphic/IconsStyled";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function RecruitmentData({ userId, recruitmentData, setRecruitmentData }) {

    const [data, setData] = useState(recruitmentData);
    const [isRequestSent, setIsRequestSent] = useState(false);

    function getValueFromScore(score) {

        const value = parseInt(score);

        if(score < 0) return 0;
        else if (score > 100) return 100;
        else return value;
    }

    function setPoints(index, active, subject, score) {

        const editedElement = {"active": active, "subject": subject, "points": getValueFromScore(score)};
        const result = Array.from(data);

        result.splice(index, 1, editedElement)
        setData(result)
    }

    function setActive(index, active, subject, score) {

        const editedElement = {"active": active, "subject": subject, "points": score};
        const result = Array.from(data);

        result.splice(index, 1, editedElement)
        setData(result)
    }

    function countChanged() {

        let count = 0;

        for(let i = 0; i < data.length; i++) {

            if(recruitmentData[i].active &&
                !(recruitmentData[i].active && data[i].active && recruitmentData[i].points === data[i].points)) count++

            if(!recruitmentData[i].active && data[i].active) count++
        }

        return count;
    }

    function handleUpdateResults() {

        const arr = Array(countChanged());
        let count = 0;

        if(arr.length != 0) {

            setIsRequestSent(true)

            for(let i = 0; i < data.length; i++) {

                if(recruitmentData[i].active) {
    
                    if(data[i].active) {
    
                       if (data[i].points !== recruitmentData[i].points) {

                            arr[count] = axios.put(`https://dev-tabrnirs-be-app.azurewebsites.net/result?subject=${data[i].subject}&newPoints=${data[i].points}`)
                            count++
                       }
    
                    } else {

                        arr[count] = axios.delete(`https://dev-tabrnirs-be-app.azurewebsites.net/result/${data[i].subject}`)
                        count++
                    }
                    
                } else if(data[i].active) {

                    const payload = {
                        "candidateId": userId,
                        "points": data[i].points,
                        "subject": data[i].subject
                    }

                    arr[count] = axios.post("https://dev-tabrnirs-be-app.azurewebsites.net/result", payload)
                    count++
                }
            }

            Promise.all(arr)
                .then((values) => {
                    console.log(values)
                    setRecruitmentData(data)
                    setIsRequestSent(false)
                    alert("Poprawnie zapisano wyniki!")}
                )
                .catch((values) => {
                    console.error(values)
                    setIsRequestSent(false)
                    alert("Coś poszło nie tak :(")}
                );
        } 
    }

    return(
        <ContentWrapper>
        <Form.Group className="d-grid gap-4">

            {data.map((element, index) => (
                <Row key={index}>

                    <Col md="auto">
                        <Form.Check className="mt-2"
                            aria-label="option 1"
                            checked={element.active}
                            onChange={(e) => setActive(index, e.target.checked, element.subject, element.points, element)}
                            />
                    </Col>

                    <Col>
                        <Form.Group size="lg" controlId="subject">
                            <Form.Control
                            type="text"
                            value={element.subject}
                            disabled
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group size="lg" controlId="score">
                            {element.active ? 
                                <Form.Control
                                type="number"
                                value={element.points}
                                onChange={(e) => setPoints(index, element.active, element.subject, e.target.value, element)}
                                />
                            : 
                                <Form.Control
                                type="number"
                                value={element.points}
                                onChange={(e) => setPoints(index, element.active, element.subject, e.target.value, element)}
                                disabled
                                />
                            }
                        </Form.Group>
                    </Col>
                </Row>
            ))}

            <Button variant="primary" onClick={() => handleUpdateResults()}>{ isRequestSent
                  ? <ButtonIconWrapper>
                      <LoadingIconWrapper size="20px">
                        <img src={LoadingIcon} alt="LoadingIcon" width="20px" heigth="20px" />
                      </LoadingIconWrapper>
                    </ButtonIconWrapper>
                  : "Zapisz"
                }</Button>

        </Form.Group>
        </ContentWrapper>
    );
}