import axios from 'axios'

import { EH_BE_HOST } from '@/api/const'

export default {
    login: (authInfo) => {
        const headers = {}
        headers['Content-type'] = 'application/json'

        const config = {
            method: 'post',
            url: `${EH_BE_HOST}/login`,
            headers,
            data: {
                'user_name': authInfo.userName,
                'password': authInfo.password,
            }
        }

        return axios.request(config)
            .then(res => res)
            .catch(error => { throw error })
    },
}