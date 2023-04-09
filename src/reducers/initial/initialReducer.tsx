import { initialTypes } from '../../actionTypes'

export default (state: any, { type, payload }: any) => {
  switch (type) {
    case initialTypes.INITIAL_SUCCESS:
      return {
        ...state,
        loading: true,
        data: payload
      }
    case initialTypes.INITIAL_FAILURE:
      return {
        ...state,
        loading: false,
        data: payload
      }

    default:
      return null
  }
}
