import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export const newsAPI = {
  getPosts: () => {
    return instance.get('/posts?_limit=10')
  },
  loadPosts: (page: number) => {
    const startIndex = page * 10

    return instance.get(`/posts?_start=${startIndex}&_limit=10`)
  },
}
