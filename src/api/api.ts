import axios from 'axios'

const API_KEY = 'AIzaSyChRwqJCQtni2qAT-qjtV0i4tWrISfVYq8'

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes',
  params: {
    key: API_KEY,
  },
})

export const booksAPI = {
  getBooks: (query: string, selectedCategory: string, sort: string) => {
    return instance.get('/?', {
      params: {
        orderBy: sort,
        q: query,
        subject: selectedCategory !== 'all' ? selectedCategory : '',
      },
    })
  },
  loadBooks: (query: string, page: number) => {
    return instance.get('/?', {
      params: {
        maxResults: 30,
        q: query,
        startIndex: (page - 1) * 30,
      },
    })
  },
}
