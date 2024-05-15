import store from '../store'
import { svs } from './svs'

// server values
export class sv {

  static role(needle = null) {
    const roles = store.getState().general.stock?.roles || []
    return svs.getRetrun(needle, roles)
  }

  static status(needle = null) {
    const roles = store.getState().general.stock?.status || []
    return svs.getRetrun(needle, roles)
  }

}