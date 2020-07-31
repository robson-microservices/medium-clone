import React, { useEffect } from 'react'
import Feed from 'pages/components/Feed'
import { useFetch } from 'hooks/useFetch'
import Pagination from 'pages/components/Pagination'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { getPaginator, limit } from 'utils'

const GlobalFeed = () => {
  const { search } = useLocation()
  const { path } = useRouteMatch()
  const { offset, currentPage } = getPaginator(search)
  const apiURL = `/articles?limit=${limit}&offset=${offset}`
  const [{ response, loading, error }, doFetch] = useFetch(apiURL)

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage])

  return (
    <div className="home-page">
      <div className="banner">
        <h1>Medium Clone</h1>
        <p>A place to share knowledge</p>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {loading && <div>Loading...</div>}
            {error && <div>Some error happened</div>}
            {!loading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={path}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalFeed
