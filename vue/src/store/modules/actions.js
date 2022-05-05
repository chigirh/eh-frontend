import * as types from './mutation-types'

import login from '@/api/login'

export default {
    login({ commit }, data) {
        return login.login(data)
            .then((res) => {
                commit(types.LOGIN, res)
            })
            .catch(error => { throw error })
    },
    logout({ commit }) {
        return commit(types.LOGOUT, { token: null })
    }
}