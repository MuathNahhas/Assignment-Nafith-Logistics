import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Home from "./component/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
