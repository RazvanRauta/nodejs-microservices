import React from 'react'
import { rest } from 'msw'

import { render as rtlRender } from '@testing-library/react'
import { TestProvider } from '@/__mocks__/store'
import { server } from '../__mocks__/server'

function render(ui, { store, ...otherOpts }) {
    return rtlRender(<TestProvider store={store}>{ui}</TestProvider>, {
        ...otherOpts,
    })
}

export * from '@testing-library/react'

export { render, server, rest }
