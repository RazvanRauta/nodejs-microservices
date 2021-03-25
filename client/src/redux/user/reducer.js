import { userActionTypes } from './action'

const countInitialState = {
    currentUser: null,
}

export default function reducer(state = countInitialState, action) {
    switch (action.type) {
        case userActionTypes.SET_USER:
            return Object.assign({}, state, {
                currentUser: action.payload,
            })
        case userActionTypes.REMOVE_USER:
            return Object.assign({}, state, {
                currentUser: null,
            })
        default:
            return state
    }
}
