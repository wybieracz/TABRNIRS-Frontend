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
import RecruiterLoginPage from "./Authorization/Login/RecruiterLoginPage";
import Faculties from "./Recruiter/FacultiesPage";
import Majors from "./Recruiter/MajorsPage";
import { defaultRecruitmentData } from "./DefaultData/DefaultRecruitmentData";
import { defaultPersonalData } from "./DefaultData/DefaultPersonalData";
import { defaultSpecsData } from "./DefaultData/DefaultSpecsData";
import {
  getSubjects,
  getUserId,
  getUser,
  getApps,
  getFaculties,
  getSpecs,
} from "./AppUtility";

function App() {
  const [userId, setUserId] = useState("");
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [personalData, setPersonalData] = useState(defaultPersonalData);
  const [faculties, setFaculties] = useState([]);

  // user
  const [apps, setApps] = useState([]);
  const [recruitmentData, setRecruitmentData] = useState(
    defaultRecruitmentData
  );

  // recruiter

  useEffect(() => {
    if (userId !== "") {
      if (isRecruiter) {
        getUser(setPersonalData);
      } else {
        getUser(setPersonalData);
        getSubjects(setRecruitmentData);
        getApps(setApps);
      }

      getFaculties(setFaculties);
    } else getUserId(setUserId);
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
              <PersonalData
                personalData={personalData}
                setPersonalData={setPersonalData}
              />
            </>
          }
        />
        <Route
          exact
          path="/candidate/recruitment-data"
          element={
            <>
              <CandidateNavBar setUserId={setUserId} />
              <RecruitmentData
                userId={userId}
                recruitmentData={recruitmentData}
                setRecruitmentData={setRecruitmentData}
              />
            </>
          }
        />
        <Route
          exact
          path="/candidate/applications"
          element={
            <>
              <CandidateNavBar setUserId={setUserId} />
              <Applications
                recruitmentData={recruitmentData}
                apps={apps}
                handleGetApps={() => getApps(setApps)}
                faculties={faculties}
              />
            </>
          }
        />
        <Route
          exact
          path="/recruiter/login"
          element={
            <RecruiterLoginPage
              setUserId={setUserId}
              setIsRecruiter={setIsRecruiter}
            />
          }
        />
        <Route
          exact
          path="/recruiter/personal-data"
          element={
            <>
              <RecruiterNavBar
                setUserId={setUserId}
                setIsRecruiter={setIsRecruiter}
              />
              <PersonalData
                personalData={personalData}
                setPersonalData={setPersonalData}
              />
            </>
          }
        />
        <Route
          exact
          path="/recruiter/applications"
          element={
            <>
              <RecruiterNavBar
                setUserId={setUserId}
                setIsRecruiter={setIsRecruiter}
              />
              <BlankPage />
            </>
          }
        />
        <Route
          exact
          path="/recruiter/majors"
          element={
            <>
              <RecruiterNavBar
                setUserId={setUserId}
                setIsRecruiter={setIsRecruiter}
              />
              <Majors userId={userId} faculties={faculties} />
            </>
          }
        />
        <Route
          exact
          path="/recruiter/faculties"
          element={
            <>
              <RecruiterNavBar
                setUserId={setUserId}
                setIsRecruiter={setIsRecruiter}
              />
              <Faculties
                userId={userId}
                faculties={faculties}
                setFaculties={setFaculties}
              />
            </>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
