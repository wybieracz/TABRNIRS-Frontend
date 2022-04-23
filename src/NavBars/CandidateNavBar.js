import React from "react";
import { NavLink } from "react-router-dom";
import { NavLinkWrapper } from "./NavLinkStyled";
import { Navbar, Button } from "react-bootstrap";

export default function CandidateNavBar() {

    return(
        <Navbar className="sticky-top navbar-expand-lg navbar-dark bg-dark pr-2 justify-content-between">
            <NavLinkWrapper>
                <NavLink to="/candidate/personal-data">Dane osobowe</NavLink>
                <NavLink to="/candidate/recruitment-data">Dane rekrutacyjne</NavLink>
                <NavLink to="/candidate/applications">Podania</NavLink>
            </NavLinkWrapper>
            <Button variant="btn btn-outline-primary me-3">Wyloguj</Button>
        </Navbar>
    );
}