import axios from 'axios'
import get from 'lodash/get'

export default ({ req }) => {
    if (typeof window === 'undefined') {
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: get(req, 'headers', {}),
        })
    } else {
        return axios.create({
            baseURL: '/',
        })
    }
}
