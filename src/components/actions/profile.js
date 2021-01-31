
import { getProfile } from '../../api'
// import { setAlert } from './alert'

import {
  GET_PROFILE,
  PROFILE_ERROR
} from './types'

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await getProfile()
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}