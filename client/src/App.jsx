import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "./front/auth/LoginScreen";
import RegisterScreen from "./front/auth/RegisterScreen";
import ProjectIndexScreen from "./admin/project/ProjectIndexScreen";
import ProjectCreateScreen from "./admin/project/ProjectCreateScreen";
import ProjectEditScreen from "./admin/project/ProjectEditScreen";

import PostIndexScreen from "./admin/post/PostIndexScreen";
import PostCreateScreen from "./admin/post/PostCreateScreen";
import PostEditScreen from "./admin/post/PostEditScreen";

import HomeScreen from "./front/pages/HomeScreen";
import "./styles/grid.css";
import "./styles/admin.css";
import "./styles/front.css";
import "./styles/responsive.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/admin/projects' element={<ProjectIndexScreen />} />
          <Route path='/admin/projects/create' element={<ProjectCreateScreen />} />
          <Route path='/admin/projects/:id' element={<ProjectEditScreen />} />

          <Route path='/admin/posts' element={<PostIndexScreen />} />
          <Route path='/admin/posts/create' element={<PostCreateScreen />} />
          <Route path='/admin/posts/:id' element={<PostEditScreen />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
