import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.scss";
import LoginScreen from "./auth/LoginScreen";
import ProjectIndexScreen from "./project/ProjectIndexScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/projects' element={<ProjectIndexScreen />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
