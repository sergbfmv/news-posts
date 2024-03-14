import { useParams } from 'react-router-dom'

import { useAppSelector } from '@/state/store'

export const Book = () => {
  const books = useAppSelector(state => state.books)
  const { id } = useParams()

  const book = books.items.find(book => book.id === id)

  if (!book) {
    return <div>Error: Book not found</div>
  }

  return (
    <div className={'bookWrapper'}>
      <img
        alt={book.volumeInfo.title}
        className={'largeImg'}
        src={book.volumeInfo.imageLinks?.thumbnail || ''}
      />
      <div>
        <h4>Title: {book.volumeInfo.title}</h4>
        <p>Category: {book.volumeInfo.categories || ' '}</p>
        <p>Authors: {book.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
        <p>Desription: {book.volumeInfo.description}</p>
      </div>
    </div>
  )
}
