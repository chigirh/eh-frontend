import axios from 'axios'

import { EH_BE_HOST } from '@/api/const'

const headers = {}
headers['Content-type'] = 'application/json'


export default {
    getPeriods: (token) => {
        const headers = {}
        headers['Content-type'] = 'application/json'
        headers['x-session-token'] = token
        const config = {
            method: 'get',
            url: `${EH_BE_HOST}/schedules/periods`,
            headers,
        }

        return axios.request(config)
            .then(res => res)
            .catch(error => { throw error })
    },
    singlePost: (data, token) => {
        const headers = {}
        headers['Content-type'] = 'application/json'
        headers['x-session-token'] = token

        const config = {
            method: 'post',
            url: `${EH_BE_HOST}/schedules`,
            headers,
            data: {
                schedules: [data]
            }
        }

        return axios.request(config)
            .then(res => res)
            .catch(error => { throw error })
    },
    aggregate: (from, to, token) => {
        const headers = {}
        headers['Content-type'] = 'application/json'
        headers['x-session-token'] = token

        const config = {
            method: 'get',
            url: `${EH_BE_HOST}/schedules/aggregate?from=${from}&to=${to}`,
            headers,
        }

        return axios.request(config)
            .then(res => res)
            .catch(error => { throw error })
    },
}