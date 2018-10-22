//Action Creators
const ADD_ENTRY = 'ADD_ENTRY'

//Actions
const addEntry = (entry) => {
  return { type: ADD_ENTRY, entry }
}

//Reducer
const ledger = (state = [], action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return [...state, action.entry]
    default:
      return state
  }
}

//store
// getState()
// dispatch()
// subscribe()
// replaceReducer()

const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
  ledger,
})

const store = createStore(
  rootReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION && window.__REDUX_DEVTOOLS_EXTENSION()
)

const updateHistory = () => {
  const list = document.getElementById('history')
  const entries = store.getState().ledger
  list.innderHTML = null 
  entries.forEach( (entry) => {
    const item = document.createElement('li')
    item.innerHTML = `$${entry.amt} - ${entry.description}`
    item.slassname = entry.type 
    list.append(item)
  })
}

const handleSubmit = (e) => {
  e.preventDefault()
  const obj = {}
  const form = e.target
  for (let el of form.elements) {
    if (el.name)
      obj[el.name] = encodeURIComponent(el.value)
  }

  store.dispatch(addEntry(obj))
  form.reset()
}

store.subscribe(updateHistory)

document.getElementById('add_entry').addEventListener('submit', handleSubmit)
