import axios from 'axios'

const headers = {}
headers['Content-type'] = 'application/json'


export default {
    getPeriods: (token) => {
        const headers = {}
        headers['Content-type'] = 'application/json'
        headers['x-session-token'] = token

        const config = {
            method: 'get',
            url: 'http://localhost:9000/schedules/periods',
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
            url: 'http://localhost:9000/schedules',
            headers,
            data: {
                schedules: [data]
            }
        }

        return axios.request(config)
            .then(res => res)
            .catch(error => { throw error })
    },
}