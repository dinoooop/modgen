import "./styles/grid.css";
import "./styles/admin.css";
import "./styles/front.css";
import "./styles/responsive.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./front/auth/LoginScreen";
import RegisterScreen from "./front/auth/RegisterScreen";
import HomeScreen from "./front/pages/HomeScreen";
import ModuleIndexScreen from "./admin/module/ModuleIndexScreen";
import ModuleCreateScreen from "./admin/module/ModuleCreateScreen";
import ModuleEditScreen from "./admin/module/ModuleEditScreen";
import ModuleGenerateScreen from "./admin/module/ModuleGenerateScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          
          <Route path='/admin/modules' element={<ModuleIndexScreen />} />
          <Route path='/admin/modules/create' element={<ModuleCreateScreen />} />
          <Route path='/admin/modules/:id' element={<ModuleEditScreen />} />
          <Route path='/admin/generate/:id' element={<ModuleGenerateScreen />} />

        </Routes>
      </Router>
    </>

  );
}

export default App;
