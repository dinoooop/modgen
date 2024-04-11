import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import ProjectReducer from './project/projectSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    project:ProjectReducer
  }
})