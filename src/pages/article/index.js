import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFetch } from 'hooks/useFetch'
import TagList from 'pages/components/TagList'
import Loading from 'pages/components/Loading'
import DisplayMessage from 'pages/components/DisplayMessage'

const Article = () => {
  const { slug } = useParams()
  const URL = `/articles/${slug}`
  const [{ loading, response, error }, doFetch] = useFetch(URL)

  useEffect(() => {
    doFetch()
  }, [doFetch])

  return (
    <div className="article-page">
      <div className="banner">
        {!loading && response && (
          <div className="container">
            <h1>{response.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${response.article.author.username}`}>
                <img src={response.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${response.article.author.username}`}>
                  {response.article.author.username}
                </Link>
                <span className="date">{response.article.createdAt}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {loading && <Loading />}
        {error && <DisplayMessage message="Something bad occurred" />}
        {!loading && response && (
          <div className="row article-content">
            <div>
              <p>{response.article.body}</p>
            </div>
            <TagList tags={response.article.tagList} />
          </div>
        )}
        <hr />
      </div>
    </div>
  )
}

export default Article
