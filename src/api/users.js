import axios from 'axios'

import { EH_BE_HOST } from '@/api/const'

const headers = {}
headers['Content-type'] = 'application/json'


export default {
    post: (data, token) => {
        const headers = {}
        headers['Content-type'] = 'application/json'
        headers['x-session-token'] = token

        const config = {
            method: 'post',
            url: `${EH_BE_HOST}/users`,
            headers,
            data: {
                'user': data
            }
        }

        return axios.request(config)
            .then(res => res)
            .catch(error => { throw error })
    },
}