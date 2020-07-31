import React, { useEffect } from 'react'
import { useFetch } from 'hooks/useFetch'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import DisplayMessage from './DisplayMessage'

const PopularTags = () => {
  const [{ response, loading, error }, doFetch] = useFetch('/tags')

  useEffect(() => {
    doFetch()
  }, [doFetch])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <DisplayMessage message={'Ops something bad happend'} />
  }

  if (!loading && response) {
    return (
      <div className="sidebar">
        <p>Popular Tags</p>
        <div className="tag-list">
          {response.tags.map((tag) => (
            <Link
              to={`/tags/${tag}`}
              className="tag-default tag-pill"
              key={tag}
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default PopularTags
