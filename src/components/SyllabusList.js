import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SyllabusList() {
  const [subjects, setSubjects] = useState([]);
  const [searchType, setSearchType] = useState("code");
  const [searchKey, setSearchKey] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const loadData = async () => {
    const subRes = await axios.get("http://localhost:9000/subjects");
    setSubjects(subRes.data);
  };
  useEffect(() => {
    if (!user) navigate("/login");
    loadData();
  }, []);
  // ham search
  const handleSearch = async () => {
    if (!searchKey.trim()) {
      loadData();
      return;
    }
    const searRes = await axios.get(
      `http://localhost:9000/subjects?${searchType}_like=${searchKey}`,
    );
    setSubjects(searRes.data);
  };
  // ham logout
  const handelLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand px-4 d-flex justify-content-between"
        style={{ background: "#1cacc9", color: "white" }}
      >
        <span className="navbar-brand mb-0 h1" style={{ color: "white" }}>
          FPT Education Learning Materials Portal
        </span>
        <div className="d-flex align-items-center text-white">
          <span className="me-3">
            Hello, {user?.fullName} ({user?.role})
          </span>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={handelLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <h3 className="mb-4">Syllabus Management</h3>

        <div className="d-flex mb-4 w-50">
          <h6 style={{ width: "150px", paddingTop: "10px" }}>Search By:</h6>
          <select
            className="form-select me-2"
            style={{ width: "150px" }}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="code">Code</option>
            <option value="name">Name</option>
          </select>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Input keyword..."
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button
            className="btn"
            style={{
              background: "#2b61df",
              color: "white",
              fontWeight: "bold",
            }}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <h3>Subject List</h3>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ background: "#1cacc9", color: "white" }}>Code</th>
              <th style={{ background: "#1cacc9", color: "white" }}>Name</th>
              <th style={{ background: "#1cacc9", color: "white" }}>
                Curriculum
              </th>
              <th style={{ background: "#1cacc9", color: "white" }}>
                Semester
              </th>
              <th style={{ background: "#1cacc9", color: "white" }}>Credits</th>
              <th style={{ background: "#1cacc9", color: "white" }}>
                Pre-requisites
              </th>
              <th style={{ background: "#1cacc9", color: "white" }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub) => (
              <tr key={sub.id}>
                <td
                  className="text fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/subject/${sub.id}`)}
                >
                  {sub.code}
                </td>
                <td>{sub.name}</td>
                <td>{sub.curriculum}</td>
                <td>{sub.semester}</td>
                <td>{sub.credits}</td>
                <td>{sub.preRequisites === 0 ? "None" : sub.preRequisites}</td>
                <td>{sub.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SyllabusList;
