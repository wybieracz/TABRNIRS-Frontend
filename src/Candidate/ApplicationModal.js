import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from 'react-bootstrap';
import { defaultApplicationData } from "../DefaultData/DefaultApplicationData";
import { ButtonIconWrapper, LoadingIconWrapper } from "../Graphic/IconsStyled";
import LoadingIcon from "../Graphic/Load_White.png";
import "../BootstrapCustom.css";
import axios from "axios";

export default function ApplicationModal({ show, onHide, faculties, specs, recruitmentData, handleGetApps }) {

    const [isRequestSent, setIsRequestSent] = useState(false);
    const [data, setData] = useState(defaultApplicationData);
    const [specializations, setSpecializations] = useState([""]);
    const [baseSubjects, setBaseSubjects] = useState([""]);
    const [subjects, setSubjects] = useState([""]);

    async function handlePostApp() {

        const payload = {
            "specializationId": data.specializationId,
            "baseSubject": data.baseSubject,
            "chosenSubject": data.subject
        }

        setIsRequestSent(true);
        try {
            await axios.post("https://dev-tabrnirs-be-app.azurewebsites.net/app", payload).then(
                response => {
                    handleGetApps()
                    onHide()
                    alert("Pomyślnie złożono nowe podanie!")
                    setIsRequestSent(false)
                }
            );
        } catch (error) {
            console.error(error);
            onHide()
            alert("Coś poszło nie tak :(")
            setIsRequestSent(false)
        }
    }

    console.log(specs)

    function getSpecializations() {

        return specs.filter(element => { return element.facultyName === data.faculty })
    }

    function getBaseSubject() {

        const temp = (specs
            .filter(element => { return element.specializationId === data.specializationId }))
            .map(element => { return element.baseSubject.subject }
        );

        return temp;
    }

    function getBaseSubjectPoints(baseSubject) {

        const temp = recruitmentData.find(element => element.subject === baseSubject);

        if(temp) return temp.points;
        else return 0;
    }

    function getSubjectPoints(subject) {

        const temp = recruitmentData.find(element => element.subject === subject);
        
        if(temp) return temp.points;
        else return 0;
    }

    function getSubjects() {

        let temp = specs.filter(
            element => { 
                return element.specializationId === data.specializationId
            });

        if(temp[0]) temp = temp[0].additionalSubjects.map(element => { return element.subject })

        return temp;
    }

    function onHideExtended() {
        onHide()
        setData({...data, faculty: ""})
    }

    useEffect(() => {
        setSpecializations(getSpecializations())
        if(!data.faculty) setData({...data, specializationId: ""})
    }, [data.faculty])

    useEffect(() => {
        setBaseSubjects(getBaseSubject())
        setSubjects(getSubjects())
        if(!data.specializationId) setData({...data, baseSubject: "", subject: ""})
    }, [data.specializationId])

    useEffect(() => {
        setData({...data, baseSubjectPoints: getBaseSubjectPoints(data.baseSubject)})
    }, [data.baseSubject])

    useEffect(() => {
        setData({...data, subjectPoints: getBaseSubjectPoints(data.subject)})
    }, [data.subject])

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
            Nowe podanie
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form.Group className="d-grid gap-4">

                <Form.Group size="lg" controlId="facultyName">
                    <Form.Label>Wydział</Form.Label>
                    <Form.Select
                        value={data.faculty}
                        onChange={(e) => setData({...data, "faculty": e.target.value})}
                    >
                        <option value=""></option>
                        {(faculties.length > 0) ? faculties.map((element, index) => (
                            <option value={element} key={index}>{element}</option>
                        )) : null}
                    </Form.Select>
                </Form.Group>

                <Form.Group size="lg" controlId="specializationName">
                    <Form.Label>Kierunek</Form.Label>
                    <Form.Select
                        value={data.specializationId}
                        onChange={(e) => setData({
                            ...data,
                            "specializationId": e.target.value
                        })}
                        disabled={!data.faculty}
                    >
                        <option value=""></option>
                        {(specializations.length > 0) ? specializations.map((element, index) => (
                            <option value={element.specializationId} key={index}>{element.specializationName}</option>
                        )) : null}
                    </Form.Select>
                </Form.Group>

                <Form.Group size="lg" controlId="baseSubject">
                    <Form.Label>Przedmiot podstawowy</Form.Label>
                    <Form.Select
                        value={data.baseSubject}
                        onChange={(e) => setData({...data, "baseSubject": e.target.value})}
                        disabled={!data.specializationId}
                    >
                        <option value=""></option>
                        {(baseSubjects.length > 0) ? baseSubjects.map((element, index) => (
                            <option value={element} key={index}>{element}{element ? ` - ${getBaseSubjectPoints(element)}%` : null}</option>
                        )) : null}
                    </Form.Select>
                </Form.Group>

                <Form.Group size="lg" controlId="subject">
                    <Form.Label>Przedmiot dodatkowy</Form.Label>
                    <Form.Select
                        value={data.subject}
                        onChange={(e) => setData({...data, "subject": e.target.value})}
                        disabled={!data.specializationId}
                    >
                        <option value=""></option>
                        {(subjects.length > 0) ? subjects.map((element, index) => (
                            <option value={element} key={index}>{element}{element ? ` - ${getSubjectPoints(element)}%` : null}</option>
                        )) : null}
                    </Form.Select>
                </Form.Group>

            </Form.Group>   
        </Modal.Body>

        <Modal.Footer  className="d-grid gap-4">

                <Button className="mx-7" variant="primary" onClick={handlePostApp}>{ isRequestSent
                    ? <ButtonIconWrapper>
                        <LoadingIconWrapper size="20px">
                            <img src={LoadingIcon} alt="LoadingIcon" width="20px" heigth="20px" />
                        </LoadingIconWrapper>
                    </ButtonIconWrapper>
                    : "Zatwierdź"}
                </Button>

        </Modal.Footer>         
        </Modal>
    );
}