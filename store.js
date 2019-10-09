import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  count: 0,
  data: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER_TEXT':
      state.data.filter( el => el.title.contain(action.value))
      state.count = state.data.length
      return state
    case 'FILTER_DATE':
      if (action.value === 'desc' ) {
        state.data.sort((a,b) => (new Date(a.date) > new Date(b.date)) ? 1 : ((new Date(b.date) > new Date(a.date)) ? -1 : 0)); 
      } else if (action.value === 'asc') {
        state.data.sort((a,b) => (new Date(a.date) > new Date(b.date)) ? -1 : ((new Date(b.date) > new Date(a.date)) ? 1 : 0)); 
      }
      state.count = state.data.length
      return state
    default:
      return state
  }
}

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}