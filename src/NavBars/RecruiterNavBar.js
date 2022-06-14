import React from "react";
import { NavLink } from "react-router-dom";
import { NavLinkWrapper } from "./NavLinkStyled";
import { Navbar, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
axios.defaults.withCredentials = true;

export default function RecruiterNavBar({ setUserId, setIsRecruiter }) {

    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await axios
                .post("https://dev-tabrnirs-be-app.azurewebsites.net/logout")
                .then(
                    response => {
                        setIsRecruiter(false)
                        setUserId("")
                        navigate("/")
                    }
            );
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <Navbar className="sticky-top navbar-expand-lg navbar-dark bg-dark pr-2 justify-content-between">
            <NavLinkWrapper>
                <NavLink to="/recruiter/personal-data">Dane rekrutera</NavLink>
                <NavLink to="/recruiter/applications">Podania</NavLink>
                <NavLink to="/recruiter/majors">Kierunki</NavLink>
                <NavLink to="/recruiter/faculties">Wydziały</NavLink>
            </NavLinkWrapper>
            <Button variant="btn btn-outline-primary me-3" onClick={handleLogout}>Wyloguj</Button>
        </Navbar>
    );
}