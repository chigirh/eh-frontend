import axios from 'axios'

export default {
    login: (authInfo) => {
        const headers = {}
        headers['Content-type'] = 'application/json'

        const config = {
            method: 'post',
            url: 'http://localhost:9000/login',
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