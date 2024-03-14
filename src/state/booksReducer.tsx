import { booksAPI } from '@/api/api'
import { Dispatch } from 'redux'

const initialState: BooksType = {
  error: '',
  items: [],
  loading: false,
  totalItems: null,
}

export const booksReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, items: action.books.items, totalItems: action.books.totalItems }
    case 'LOAD_MORE_BOOKS':
      return {
        ...state,
        items: [...state.items, ...action.books.items],
        totalItems: action.books.totalItems,
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

export const setBooks = (books: BooksType) => ({ books, type: 'SET_BOOKS' }) as const
export const loadMoreBooks = (books: BooksType) => ({ books, type: 'LOAD_MORE_BOOKS' }) as const
const setLoading = (loading: boolean) => ({ loading, type: 'SET_LOADING' }) as const

export const setError = (error: string) =>
  ({
    error,
    type: 'SET_ERROR',
  }) as const

export const searchBooks = (title: string, category: string, sort: string) => {
  return async (dispatch: ThunkDispatch) => {
    try {
      dispatch(setLoading(true))
      const res = await booksAPI.getBooks(title, category, sort)

      dispatch(setBooks(res.data))
      dispatch(setError(''))
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(setError(error.message))
      } else {
        dispatch(setError('An unknown error occurred'))
      }
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const loadBooks = (title: string, page: number) => {
  return async (dispatch: ThunkDispatch) => {
    try {
      const res = await booksAPI.loadBooks(title, page)

      dispatch(loadMoreBooks(res.data))
    } catch (error) {
      // Handle error, e.g., dispatch(getBooksFailure(error.message))
    }
  }
}

export type BookType = {
  id: string
  volumeInfo: VolumeInfo
}

export type VolumeInfo = {
  authors: string[]
  categories: string
  description: string
  imageLinks: {
    smallThumbnail: string
    thumbnail: string
  }
  title: string
}

export type BooksType = {
  error: string
  items: BookType[]
  loading: boolean
  totalItems: null | number
}

type SetBooksActionType = ReturnType<typeof setBooks>
type LoadMoreBooksActionType = ReturnType<typeof loadMoreBooks>
type SetLoading = ReturnType<typeof setLoading>
type SetError = ReturnType<typeof setError>

type ActionsType = LoadMoreBooksActionType | SetBooksActionType | SetError | SetLoading
type ThunkDispatch = Dispatch<ActionsType>
