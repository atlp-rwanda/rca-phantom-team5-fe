import axios from 'axios'
import { variables } from '../helpers'
import { authTypes } from '../actionTypes'

export interface signIn {
    email: string,
    password: string
}

export const signIn = (email: string, password: string, device_id: string) => async (dispatch: any) => {
  await axios.post(variables.AUTH_API+'/signin', { email, password, device_id })
    .then((response) => {
      dispatch({
        type: authTypes.SIGNIN_SUCCESS,
        payload: response.data
      })
    })
    .catch((error) => {
      dispatch({
        type: authTypes.SIGNIN_FAILURE,
        payload: error.response.data
      })
    })
}