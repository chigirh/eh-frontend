import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import actions from '@/store/modules/actions'
import mutations from '@/store/modules/mutations'

const state = {
  auth: {
    token: null,
    userName: null,
    firstName: null,
    familyName: null,
    roles: Array()
  },
  periods: Array(),
}

export default createStore({
  state,
  actions,
  mutations,
  plugins: [createPersistedState(
    {
      key: 'eh_fe',
      paths: [
        'auth.token',
        'auth.userName',
        'auth.firstName',
        'auth.familyName',
        'auth.roles',
        'periods'
      ],
      storage: window.sessionStorage,
    }
  )]
})
