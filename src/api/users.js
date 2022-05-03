import axios from 'axios'

const headers = {}
headers['Content-type'] = 'application/json'


export default {
    post: (data, token) => {
        const headers = {}
        headers['Content-type'] = 'application/json'
        headers['x-session-token'] = token

        const config = {
            method: 'post',
            url: 'http://localhost:9000/users',
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