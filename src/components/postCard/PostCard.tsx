import { NavLink } from 'react-router-dom'

import { PostType } from '@/state/postsReducer'

import s from '@/components/postCard/PostCard.module.scss'

export const PostCard = ({ body, id, title }: PostType) => {
  return (
    <NavLink className={s.postCard} to={`/post/${id}`}>
      <div>
        <h3 className={s.postCard__title}>Title: {title}</h3>
        <span>------</span>
        <p className={s.postCard__body}>body: {body}</p>
      </div>
    </NavLink>
  )
}
