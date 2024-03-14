import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { postsReducer } from '@/state/postsReducer'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { ThunkDispatch, thunk } from 'redux-thunk'

const rootReducer = combineReducers({
  posts: postsReducer,
})

// @ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
