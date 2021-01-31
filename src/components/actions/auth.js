
import { setAlert } from './alert'
import { 
  REGISTER_SUCCESS, 
  REGISTER_FAIL, 
  USER_LOADED, 
  AUTH_ERROR, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL,
  LOGOUT } from './types'
import setAuthToken from '../utils/setAuthToken'
import { loginUser, signInUser, uploadUser } from '../../api'

// config for token
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

// Load User
export const loadUser = () => async dispatch => {

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await signInUser()
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })

  } catch (error) {
    
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await uploadUser(body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login User
export const login = (email, password) => async dispatch => {

  const body = JSON.stringify({ email, password });

  
  try {
    const res = await loginUser(body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout, clear profile
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}
