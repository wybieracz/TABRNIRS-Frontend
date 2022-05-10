import styled from 'styled-components'

const AppsContentWrapper = styled.div`
margin: 1.5%;
border: 1px solid #ced4da;
border-radius: 10px;
width: auto;
height: auto;
justify-content: center;
`;

const ButtonWrapper = styled.div`
margin: 1.5%;
width: auto;
height: auto;
`;

const Separator = styled.div`
    width: 100%;
    background-color: #ced4da;
    height: 1px;
`;

const StatusIcon = styled.button`
border-radius: 50%;
border: 0px;
background: ${props => props.background};
color: #FFFFFF;
height: 22px;
width: 22px;
display: inline-flex;
align-items: center;
justify-content: center;
overflow: hidden;
margin: 0px 10px 0px 5px;
`;

export { AppsContentWrapper, ButtonWrapper, Separator, StatusIcon }