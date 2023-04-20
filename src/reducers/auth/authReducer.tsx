import { authTypes } from '../../actionTypes'

export default (state: any, { type, payload }: any) => {
  switch (type) {
    case authTypes.SIGNIN_SUCCESS:
        console.log(payload)
      return {
        ...state,
        loading: true,
        data: payload
      }
    case authTypes.SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload
      }

    default:
      return null
  }
}
