import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Authorization/Login/LoginPage";
import RegisterPage from "./Authorization/RegisterPage";
import ErrorPage from "./Pages/ErrorPage";
import BlankPage from "./Pages/BlankPage";
import CandidateNavBar from "./NavBars/CandidateNavBar";
import RecruiterNavBar from "./NavBars/RecruiterNavBar";
import PersonalData from "./Candidate/PersonalDataPage";

function App() {

  const [userId, setUserId] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage setIsLogged={setIsLogged} />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/candidate/personal-data" element={
          <><CandidateNavBar setIsLogged={setIsLogged} />
          <PersonalData setUserId={setUserId} isLogged={isLogged} /></>
        } />
        <Route exact path="/candidate/recruitment-data" element={
          <><CandidateNavBar setIsLogged={setIsLogged} />
          <BlankPage /></>
        } />
        <Route exact path="/candidate/applications" element={
          <><CandidateNavBar setIsLogged={setIsLogged} />
          <BlankPage /></>
        } />
        <Route exact path="/recruiter/personal-data" element={
          <><RecruiterNavBar />
          <PersonalData /></>
        } />
        <Route exact path="/recruiter/applications" element={
          <><RecruiterNavBar />
          <BlankPage /></>
        } />
        <Route exact path="/recruiter/majors" element={
          <><RecruiterNavBar />
          <BlankPage /></>
        } />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
