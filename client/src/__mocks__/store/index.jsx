import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducer'
import { createWrapper } from 'next-redux-wrapper'

const TestProvider = ({ store, children }) => (
    <Provider store={store}>{children}</Provider>
)

const makeStore = (initialState) => {
    return createStore(rootReducer, initialState)
}

function makeTestStore(opts = {}) {
    const store = makeStore(opts)
    const origDispatch = store.dispatch
    store.dispatch = jest.fn(origDispatch)
    return store
}

const withRedux = (component, store) =>
    createWrapper(store).withRedux(component)

export { makeTestStore, TestProvider, makeStore, withRedux }
