import React from "react";
import { NavLink } from "react-router-dom";
import { NavLinkWrapper } from "./NavLinkStyled";
import { Navbar, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
axios.defaults.withCredentials = true;

export default function CandidateNavBar({ setUserId }) {

    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await axios.post("https://dev-tabrnirs-be-app.azurewebsites.net/logout").then(
                response => {
                    setUserId("")
                    navigate("/")
                }
            );
        } catch (error) {
            console.error(error)
            //navigate("/")
        }
    }

    return(
        <Navbar className="sticky-top navbar-expand-lg navbar-dark bg-dark pr-2 justify-content-between">
            <NavLinkWrapper>
                <NavLink to="/candidate/personal-data">Dane osobowe</NavLink>
                <NavLink to="/candidate/recruitment-data">Dane rekrutacyjne</NavLink>
                <NavLink to="/candidate/applications">Podania</NavLink>
            </NavLinkWrapper>
            <Button variant="btn btn-outline-primary me-3" onClick={handleLogout}>Wyloguj</Button>
        </Navbar>
    );
}