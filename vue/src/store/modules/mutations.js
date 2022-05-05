import * as types from './mutation-types'

export default {
  [types.LOGIN](state, payload) {
    const data = payload.data
    state.auth.token = data.session_token
    state.auth.userName = data.user.user_name
    state.auth.firstName = data.user.first_name
    state.auth.familyName = data.user.family_name
    state.auth.roles = data.user.roles
  },
  [types.PERIODS](state, payload) {
    const data = payload.data
    state.periods = data.periods
  },
  [types.LOGOUT](state, payload) {
    state.auth.token = payload.token
  },
}