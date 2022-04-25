import React from "react";
import { NavLink } from "react-router-dom";
import { NavLinkWrapper } from "./NavLinkStyled";
import { Navbar, Button } from "react-bootstrap";

export default function RecruiterNavBar() {

    return(
        <Navbar className="sticky-top navbar-expand-lg navbar-dark bg-dark pr-2 justify-content-between">
            <NavLinkWrapper>
                <NavLink to="/recruiter/personal-data">Dane rekrutera</NavLink>
                <NavLink to="/recruiter/applications">Podania</NavLink>
                <NavLink to="/recruiter/majors">Kierunki</NavLink>
            </NavLinkWrapper>
            <Button variant="btn-outline-primary me-3">Wyloguj</Button>
        </Navbar>
    );
}