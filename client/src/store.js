import { configureStore } from '@reduxjs/toolkit'
import authReducer from './front/auth/authSlice'
import ModuleReducer from './admin/module/moduleSlice'
import PostReducer from './admin/post/postSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    module:ModuleReducer,
    post:PostReducer,
  }
})