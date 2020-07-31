import React, { useEffect } from 'react'
import Feed from 'pages/components/Feed'
import { useFetch } from 'hooks/useFetch'
import Pagination from 'pages/components/Pagination'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { getPaginator, limit } from 'utils'
import PopularTags from '../components/PopularTags'
import FeedToggler from '../components/FeedToggler'
import Banner from '../components/Banner'
import DisplayMessage from '../components/DisplayMessage'
import Loading from '../components/Loading'

const YourFeed = () => {
  const { search } = useLocation()
  const { path } = useRouteMatch()
  const { offset, currentPage } = getPaginator(search)
  const apiURL = `/articles/feed/?limit=${limit}&offset=${offset}`
  const [{ response, loading, error }, doFetch] = useFetch(apiURL)

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage])

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {loading && <Loading />}
            {error && <DisplayMessage message="Some error happened" />}
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
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourFeed
