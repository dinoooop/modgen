import { configureStore } from '@reduxjs/toolkit'
import authReducer from './admin/auth/authSlice'
import ModuleReducer from './admin/module/moduleSlice'
import GeneralReducer from './admin/general/generalSlice'
import UserReducer from './admin/user/userSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    module: ModuleReducer,
    general: GeneralReducer,
    user: UserReducer,
  }
})