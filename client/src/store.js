import { configureStore } from '@reduxjs/toolkit'
import authReducer from './front/auth/authSlice'
import ProjectReducer from './admin/project/projectSlice'
import PostReducer from './admin/post/postSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    project:ProjectReducer,
    post:PostReducer
  }
})