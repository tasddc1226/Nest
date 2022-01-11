import {
  LOGIN_USER,
  SIGNUP_USER,
  AUTH_USER,
  LOGOUT_USER,
} from '../_actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      // action.payload는 backend에서 보내준 data
      return { ...state, loginSuccess: action.payload }
    case SIGNUP_USER:
      return { ...state, signup: action.payload }
    case AUTH_USER:
      return { ...state, userData: action.payload }
    case LOGOUT_USER:
      return { ...state }
    default:
      return state
  }
}
