import authInitialState from '../../store/states/initial/authInitialState'
import authReducer from '../auth/authReducer'

export default (state = authInitialState, action: any) => {
    const auth: any = authReducer(state, action)
    return (auth || state)
  }
  