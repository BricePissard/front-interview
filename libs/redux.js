import React from 'react'
import { Provider } from 'react-redux'
import { initializeStore } from '../store'

export const withRedux = (PageComponent) => {
  const WithRedux = ({ initialReduxState, ...props }) => {
    const store = getOrInitializeStore(initialReduxState)
    return (
      <Provider store={store}>
        <PageComponent {...props} />
      </Provider>
    )
  }

  return WithRedux
}

let reduxStore
const getOrInitializeStore = initialState => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore(initialState)
  }

  return reduxStore
}