import { useEffect, useState } from 'react'

import { PostCard } from '@/components/postCard/PostCard'
import { getPosts, loadPosts } from '@/state/postsReducer'
import { useAppDispatch, useAppSelector } from '@/state/store'

import s from '@/components/posts/Posts.module.scss'

export const Posts = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(state => state.posts)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1)
    dispatch(loadPosts(page))
  }

  return (
    <>
      {posts.loading && <p>Loading...</p>}

      {posts.error && <p style={{ color: 'red' }}>Error: {posts.error}</p>}

      <div className={s.postsList}>
        {posts.posts.map(post => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      <button className={s.postsBtn} onClick={handleLoadMore}>
        Load more
      </button>
    </>
  )
}
