import { NavLink } from 'react-router-dom'

import { BookType } from '@/state/booksReducer'

const BookCard = (book: BookType) => {
  return (
    <NavLink className={'book-card'} to={`/book/${book.id}`}>
      <img alt={book.volumeInfo.title} src={book.volumeInfo.imageLinks?.smallThumbnail || ''} />
      <div>
        <h4>Title: {book.volumeInfo.title}</h4>
        <p>Category: {book.volumeInfo.categories?.[0] || 'Unknown'}</p>
        <p>Authors: {book.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
      </div>
    </NavLink>
  )
}

export default BookCard
