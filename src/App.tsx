import { Route, Routes } from 'react-router-dom'

import { Post } from '@/components/post/Post'
import { Posts } from '@/components/posts/Posts'

import s from '@/App.module.scss'

function App() {
  return (
    <div className={s.app}>
      <h1 className={s.title}>* News Posts *</h1>
      <Routes>
        <Route element={<Posts />} path={'/news-posts'} />
        <Route element={<Post />} path={'/post/:id'} />
      </Routes>
    </div>
  )
}

export default App
