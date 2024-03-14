import { newsAPI } from '@/api/api'
import { Dispatch } from 'redux'

const initialState: PostsType = {
  error: '',
  loading: false,
  posts: [],
}

export const postsReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.posts }
    case 'LOAD_MORE_POSTS':
      return {
        ...state,
        posts: [...state.posts, ...action.posts],
      }
    case 'SET_LOADING':
      return { ...state, loading: action.loading }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

export const setPosts = (posts: PostType[]) => ({ posts, type: 'SET_POSTS' }) as const
export const loadMorePosts = (posts: PostType[]) => ({ posts, type: 'LOAD_MORE_POSTS' }) as const
const setLoading = (loading: boolean) => ({ loading, type: 'SET_LOADING' }) as const

export const setError = (error: string) =>
  ({
    error,
    type: 'SET_ERROR',
  }) as const

export const getPosts = () => async (dispatch: ThunkDispatch) => {
  try {
    dispatch(setLoading(true))
    const res = await newsAPI.getPosts()

    dispatch(setPosts(res.data))
    dispatch(setError(''))
  } catch (error: unknown) {
    handleError(dispatch, error)
  } finally {
    dispatch(setLoading(false))
  }
}

export const loadPosts = (page: number) => async (dispatch: ThunkDispatch) => {
  try {
    const res = await newsAPI.loadPosts(page)

    dispatch(loadMorePosts(res.data))
  } catch (error) {
    handleError(dispatch, error)
  }
}

const handleError = (dispatch: ThunkDispatch, error: unknown) => {
  if (error instanceof Error) {
    dispatch(setError(error.message))
  } else {
    dispatch(setError('An unknown error occurred'))
  }
}

export type PostType = {
  body: string
  id: number
  title: string
  userId: number
}

export type PostsType = {
  error: string
  loading: boolean
  posts: PostType[]
}

type SetPostsActionType = ReturnType<typeof setPosts>
type LoadMorePostsActionType = ReturnType<typeof loadMorePosts>
type SetLoading = ReturnType<typeof setLoading>
type SetError = ReturnType<typeof setError>

type ActionsType = LoadMorePostsActionType | SetError | SetLoading | SetPostsActionType
type ThunkDispatch = Dispatch<ActionsType>
