import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Authorization/Login/LoginPage";
import RegisterPage from "./Authorization/Register/RegisterPage";
import ErrorPage from "./Pages/ErrorPage";
import BlankPage from "./Pages/BlankPage";
import CandidateNavBar from "./NavBars/CandidateNavBar";
import RecruiterNavBar from "./NavBars/RecruiterNavBar";
import PersonalData from "./Candidate/PersonalDataPage";
import RecruitmentData from "./Candidate/RecruitmentDataPage";
import Applications from "./Candidate/ApplicationsPage";
import { defaultRecruitmentData } from "./DefaultData/DefaultRecruitmentData";
import { defaultPersonalData } from "./DefaultData/DefaultPersonalData";
import { getSubjects, getUserId, getUser, getApps } from "./AppUtility";

function App() {

  const [userId, setUserId] = useState("");
  const [apps, setApps] = useState([]);
  const [recruitmentData, setRecruitmentData] = useState(defaultRecruitmentData);
  const [personalData, setPersonalData] = useState(defaultPersonalData);

  useEffect(() => {
    if(userId !== "") {
      getUser(setPersonalData)
      getSubjects(setRecruitmentData)
      getApps(setApps)
    }
    else getUserId(setUserId)
  }, [userId]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage setUserId={setUserId} />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route
          exact
          path="/candidate/personal-data"
          element={
            <>
              <CandidateNavBar setUserId={setUserId} />
              <PersonalData personalData={personalData} setPersonalData={setPersonalData} />
            </>
          }
        />
        <Route
          exact
          path="/candidate/recruitment-data"
          element={
            <>
              <CandidateNavBar setUserId={setUserId} />
              <RecruitmentData userId={userId} recruitmentData={recruitmentData} setRecruitmentData={setRecruitmentData} />
            </>
          }
        />
        <Route
          exact
          path="/candidate/applications"
          element={
            <>
              <CandidateNavBar setUserId={setUserId} />
              <Applications recruitmentData={recruitmentData} apps={apps} handleGetApps={() => getApps(setApps)} />
            </>
          }
        />
        <Route
          exact
          path="/recruiter/personal-data"
          element={
            <>
              <RecruiterNavBar />
              <PersonalData />
            </>
          }
        />
        <Route
          exact
          path="/recruiter/applications"
          element={
            <>
              <RecruiterNavBar />
              <BlankPage />
            </>
          }
        />
        <Route
          exact
          path="/recruiter/majors"
          element={
            <>
              <RecruiterNavBar />
              <BlankPage />
            </>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
