import { configureStore } from '@reduxjs/toolkit'
import authReducer from './front/auth/authSlice'
import ModuleReducer from './admin/module/moduleSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    module:ModuleReducer,
  }
})