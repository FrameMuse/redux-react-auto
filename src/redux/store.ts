import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import combinedReducers from "./combinedReducers"
import { actionSubscribe, injectReducers } from "./storeHelpers"

const store = createStore(combinedReducers, compose(applyMiddleware(thunk)))
export default store
// Extensions
store.actionSubscribe = actionSubscribe
store.injectReducers = injectReducers
// Declarations
declare module "redux" {
  interface Store {
    actionSubscribe: typeof actionSubscribe
    injectReducers: typeof injectReducers
  }
}
declare module "react-redux" {
  interface DefaultRootState extends ReturnType<typeof store.getState> { }
  function useDispatch<TDispatch = typeof store.dispatch>(): TDispatch
}