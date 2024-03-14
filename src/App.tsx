import { Route, Routes } from 'react-router-dom'

import { Book } from '@/components/Book'

import './App.scss'

import SearchBooks from './components/SearchBooks'

function App() {
  return (
    <div className={'app'}>
      <h1>Book Search App</h1>
      <Routes>
        <Route element={<SearchBooks />} path={'/find-book'} />
        <Route element={<Book />} path={'/book/:id'} />
      </Routes>
    </div>
  )
}

export default App
