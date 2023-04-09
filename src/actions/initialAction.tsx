import axios from 'axios'
import { variables } from '../helpers'
import { initialTypes } from '../actionTypes'

export const initial = () => async (dispatch: any) => {
  await axios.get(variables.INITIAL_API)
    .then((response) => {
      dispatch({
        type: initialTypes.INITIAL_SUCCESS,
        payload: response.data
      })
    })
    .catch((error) => {
      dispatch({
        type: initialTypes.INITIAL_FAILURE,
        payload: error.response.data
      })
    })
}
