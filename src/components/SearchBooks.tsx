import { ChangeEvent, useState } from 'react'

import { loadBooks, searchBooks } from '@/state/booksReducer'
import { useAppDispatch, useAppSelector } from '@/state/store'

import BookCard from './BookCard'

const SearchBooks = () => {
  const dispatch = useAppDispatch()
  const books = useAppSelector(state => state.books)
  const [queryValue, setQueryValue] = useState('')
  const [page, setPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSort, setSelectedSort] = useState('relevance')

  const handleSearch = () => {
    dispatch(searchBooks(queryValue, selectedCategory, selectedSort))
  }

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
    dispatch(loadBooks(queryValue, page + 1))
  }

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value)
  }

  return (
    <div>
      <input
        onChange={e => setQueryValue(e.target.value)}
        onKeyDown={e => {
          e.key === 'Enter' && handleSearch()
        }}
        placeholder={'Search for books...'}
        type={'text'}
      />

      <select onChange={handleCategoryChange} value={selectedCategory}>
        <option value={'all'}>All</option>
        <option value={'art'}>Art</option>
        <option value={'biography'}>Biography</option>
        <option value={'computers'}>Computers</option>
        <option value={'history'}>History</option>
        <option value={'medical'}>Medical</option>
        <option value={'poetry'}>Poetry</option>
      </select>

      <select onChange={e => setSelectedSort(e.target.value)} value={selectedSort}>
        <option value={'relevance'}>Relevance</option>
        <option value={'newest'}>Newest</option>
      </select>

      <button onClick={handleSearch}>Find book</button>

      {books.loading && <p>Loading...</p>}

      {books.error && <p style={{ color: 'red' }}>Error: {books.error}</p>}

      {books?.items && books.items.length > 0 ? (
        <div>
          <p>Found {books.totalItems} books</p>
          <div className={'booksList'}>
            {books.items.map(book => (
              <BookCard id={book.id} key={book.id} volumeInfo={book.volumeInfo} />
            ))}
          </div>
        </div>
      ) : (
        <p>No books found.</p>
      )}
      <button onClick={handleLoadMore}>Load more</button>
    </div>
  )
}

export default SearchBooks
