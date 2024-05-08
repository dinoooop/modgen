import "./styles/grid.css";
import "./styles/admin.css";
import "./styles/front.css";
import "./styles/responsive.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./admin/auth/LoginScreen";
import RegisterScreen from "./admin/auth/RegisterScreen";
import HomeScreen from "./front/pages/HomeScreen";
import ModuleIndexScreen from "./admin/module/ModuleIndexScreen";
import ModuleCreateScreen from "./admin/module/ModuleCreateScreen";
import ModuleEditScreen from "./admin/module/ModuleEditScreen";
import ModuleGenerateScreen from "./admin/module/ModuleGenerateScreen";

import FlushScreen from "./admin/general/FlushScreen";

import UserIndexScreen from "./admin/user/UserIndexScreen";
import UserCreateScreen from "./admin/user/UserCreateScreen";
import UserEditScreen from "./admin/user/UserEditScreen";
import UserProfileScreen from "./admin/user/UserProfileScreen";
import UserSecurityScreen from "./admin/user/UserSecurityScreen";

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

          <Route path='/admin/flush' element={<FlushScreen />} />

          <Route path='/admin/users' element={<UserIndexScreen />} />
          <Route path='/admin/users/create' element={<UserCreateScreen />} />
          <Route path='/admin/users/:id' element={<UserEditScreen />} />
          <Route path='/admin/profile' element={<UserProfileScreen />} />
          <Route path='/admin/security' element={<UserSecurityScreen />} />

        </Routes>
      </Router>
    </>

  );
}

export default App;
