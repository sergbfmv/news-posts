import { useParams } from 'react-router-dom'

import { useAppSelector } from '@/state/store'

import s from '@/components/post/Post.module.scss'

export const Post = () => {
  const posts = useAppSelector(state => state.posts.posts)
  const { id } = useParams()

  const post = posts.find(post => post.id === Number(id))

  if (!post) {
    return <div>Error: Post not found</div>
  }

  return (
    <div className={s.postWrapper}>
      <h4>Title: {post.title}</h4>
      <span>----------------------------------</span>
      <p>Body: {post.body}</p>
    </div>
  )
}
