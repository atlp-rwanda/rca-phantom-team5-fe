import initialInitialState from '../../store/initialState'
import initialReducer from './initialReducer'

export default (state = initialInitialState, action: any) => {
  const initial: any = initialReducer(state, action)
  return (initial || state)
}
