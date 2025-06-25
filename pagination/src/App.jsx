import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Number of posts per page
  const [postPerPage, setPostPerPage] = useState(10);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(data.length / postPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/posts');
        const result = await response.json();
        console.log('result', result);
        setData(result.posts);
      }
      catch (error) {
        console.log('error', error);
      }
    }
    fetchData()
  }, [])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  if (!data.length) {
    return <div className="container loading">Loading...</div>
  }

  
  return (
    <div className="container">
      <h1>pagination</h1>
      <ul className="post-list">
        {
          currentPosts.map((post) => (
            <li key={post.id}> <span>{post.id + " - " +post.title}</span></li>
          ))
        }
      </ul>
      <div className="pagination">
        <button onClick={()=>paginate(1)}><span>First</span></button>
        <button onClick={()=>paginate(currentPage - 1)} disabled={currentPage === 1}><span>Prev</span></button>
        {
          new Array(totalPages).fill(0).map((_, index) => (
            <button
              key={index}
              onClick={() => {paginate(index + 1)}}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))
        }
        <button  onClick={()=>paginate(currentPage + 1)} disabled={currentPage === totalPages}><span>Next</span></button>
        <button onClick={()=> paginate(totalPages)}><span>Last</span></button>
      </div>
    </div>
  )
}

export default App
