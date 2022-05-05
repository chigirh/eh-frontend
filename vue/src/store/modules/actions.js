import * as types from './mutation-types'

import login from '@/api/login'
import schedulsApi from "@/api/schedule";

export default {
    login({ commit }, data) {
        return login.login(data)
            .then((res) => {
                commit(types.LOGIN, res)
            })
            .catch(error => { throw error })
    },
    periods({ commit }, token) {
        return schedulsApi
            .getPeriods(token)
            .then((res) => {
                commit(types.PERIODS, res)
            })
            .catch(error => { throw error })
    },
    logout({ commit }) {
        return commit(types.LOGOUT, { token: null })
    }
}