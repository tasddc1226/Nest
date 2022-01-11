import axios from 'axios'
import { LOGIN_USER, SIGNUP_USER, AUTH_USER, LOGOUT_USER } from './types'

export function loginUser(dataTosubmit) {
  const request = axios
    .post('/api/users/signin', dataTosubmit)
    .then((response) => response.data)

  return {
    // 받은 request를 Reducer로 넘겨줌
    type: LOGIN_USER,
    payload: request,
  }
}

export function signupUser(dataTosubmit) {
  const request = axios
    .post('/api/users/signup', dataTosubmit)
    .then((response) => response.data)

  return {
    // 받은 request를 Reducer로 넘겨줌
    type: SIGNUP_USER,
    payload: request,
  }
}

export function auth() {
  const request = axios.get('/api/users/auth').then((response) => response.data)

  return {
    // 받은 request를 Reducer로 넘겨줌
    type: AUTH_USER,
    payload: request,
  }
}

export function logoutUser() {
  const request = axios
    .get('/api/users/logout')
    .then((response) => response.data)

  return {
    type: LOGOUT_USER,
    payload: request,
  }
}
