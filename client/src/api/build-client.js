import axios from 'axios'
import get from 'lodash/get'

const buildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        return axios.create({
            baseURL: process.env.SERVER_URL_BASE,
            headers: get(req, 'headers', {}),
        })
    } else {
        return axios.create({
            baseURL: '/',
        })
    }
}

export default buildClient
