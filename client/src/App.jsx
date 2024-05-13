import "./styles/grid.css";
import "./styles/admin.css";
import "./styles/front.css";
import "./styles/responsive.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./front/pages/HomeScreen";
import ModuleIndexScreen from "./admin/module/ModuleIndexScreen";
import ModuleCreateScreen from "./admin/module/ModuleCreateScreen";
import ModuleEditScreen from "./admin/module/ModuleEditScreen";
import ModuleGenerateScreen from "./admin/module/ModuleGenerateScreen";

import FlushScreen from "./admin/general/FlushScreen";

import UserIndexScreen from "./admin/user/UserIndexScreen";
import UserCreateScreen from "./admin/user/UserCreateScreen";
import UserEditScreen from "./admin/user/UserEditScreen";

import AuthLoginScreen from "./admin/auth/AuthLoginScreen";
import AuthRegisterScreen from "./admin/auth/AuthRegisterScreen";
import AuthVerifyScreen from "./admin/auth/AuthVerifyScreen";
import AuthForgotPasswordScreen from "./admin/auth/AuthForgotPasswordScreen";
import AuthResetPasswordScreen from "./admin/auth/AuthResetPasswordScreen";
import AuthProfileScreen from "./admin/auth/AuthProfileScreen";
import AuthSecurityScreen from "./admin/auth/AuthSecurityScreen";
import AuthWelcomeScreen from "./admin/auth/AuthWelcomeScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<AuthLoginScreen />} />
          <Route path='/register' element={<AuthRegisterScreen />} />
          <Route path="/forgot-password" element={<AuthForgotPasswordScreen />} />
          <Route path="/reset-password/:process_link" element={<AuthResetPasswordScreen />} />
          <Route path="/welcome/:process_link" element={<AuthWelcomeScreen />} />

          <Route path='/admin/modules' element={<ModuleIndexScreen />} />
          <Route path='/admin/modules/create' element={<ModuleCreateScreen />} />
          <Route path='/admin/modules/:id' element={<ModuleEditScreen />} />
          <Route path='/admin/generate/:id' element={<ModuleGenerateScreen />} />

          <Route path='/admin/flush' element={<FlushScreen />} />

          <Route path='/admin/users' element={<UserIndexScreen />} />
          <Route path='/admin/users/create' element={<UserCreateScreen />} />
          <Route path='/admin/users/:id' element={<UserEditScreen />} />
          <Route path='/admin/profile' element={<AuthProfileScreen />} />
          <Route path='/admin/security' element={<AuthSecurityScreen />} />
          <Route path='/verify/:id' element={<AuthVerifyScreen />} />

        </Routes>
      </Router>
    </>

  );
}

export default App;
