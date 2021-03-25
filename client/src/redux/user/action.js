export const userActionTypes = {
    SET_USER: 'SET_USER',
    REMOVE_USER: 'REMOVE_USER',
}

export const setUser = (data) => (dispatch) => {
    return dispatch({ type: userActionTypes.SET_USER, payload: data })
}

export const removeUser = () => (dispatch) => {
    return dispatch({ type: userActionTypes.REMOVE_USER })
}
