import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ErrorPage from "./Pages/ErrorPage";
import RegisterPage from "./Pages/RegisterPage";
import BlankPage from "./Pages/BlankPage";
import CandidateNavBar from "./NavBars/CandidateNavBar";
import RecruiterNavBar from "./NavBars/RecruiterNavBar";
import PersonalData from "./Candidate/PersonalDataPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/candidate/personal-data" element={
          <><CandidateNavBar />
          <PersonalData /></>
        } />
        <Route exact path="/candidate/recruitment-data" element={
          <><CandidateNavBar />
          <BlankPage /></>
        } />
        <Route exact path="/candidate/applications" element={
          <><CandidateNavBar />
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
