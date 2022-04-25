import styled from "styled-components";

const NavLinkWrapper = styled.div`

a {
    margin: 0px 100px 0px 24px;
    text-decoration: none;
    color: #ffffff;
    opacity: 40%;
    transition: all 0.1s ease;
    &:hover {
        opacity: 80%;
    }
}

a.active {
    opacity: 100%;
}
`;

export { NavLinkWrapper }