import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SyllabusList from "./components/SyllabusList";
import SubjectDetail from "./components/SubjectDetail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/syllabus" element={<SyllabusList />} />
        <Route path="/subject/:id" element={<SubjectDetail />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
