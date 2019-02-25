const blogs = [
  {
    title: 'söpö',
    author: 'söpömpi',
    url: 'https://www.fi',
    likes: 4
  },
  {
    title: 'tosisöpö',
    author: 'tosi söpömpi',
    url: 'https://www.fi',
    likes: 2
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}



export default { getAll }