import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:5000/login", { username, password })
      .then((result) => {
        window.localStorage.setItem("Token", result.data.token);

        navigate("/Home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div class="main">
        <p class="sign" align="center">
          Sign in
        </p>
        <div class="form1">
          <input
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            class="un "
            type="text"
            align="center"
          />
          <input
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            class="pass"
            type="password"
            align="center"
          />
          <button className="submit" onClick={login}>
            login
          </button>

          <p class="forgot" align="center">
            Forgot Password?
          </p>
          <form />
        </div>
      </div>
    </div>
  );
};

export default Login;
