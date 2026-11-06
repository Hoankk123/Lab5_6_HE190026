import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:9000/accounts?email=${email}&password=${password}`,
      );
      if (res.data.length > 0) {
        const user = res.data[0];
        if (user.status === "Inactive") {
          setError("Tài khoản đã bị khóa");
        } else {
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/syllabus");
        }
      } else {
        setError("Sai email hoặc mật khẩu");
      }
    } catch (err) {
      setError("Lỗi server");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Sign In</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="email of student or lecture"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Enter password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger fw-bold">{error}</p>}
          <button
            type="submit"
            className=" w-100"
            style={{ border: "0px", background: "#1cacc9", padding:"10px", borderRadius:"8px", color:"white" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
