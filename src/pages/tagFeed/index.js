import React, { useEffect } from 'react'
import Feed from 'pages/components/Feed'
import { useFetch } from 'hooks/useFetch'
import Pagination from 'pages/components/Pagination'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { getPaginator, limit } from 'utils'
import PopularTags from '../components/PopularTags'
import FeedToggler from '../components/FeedToggler'
import Banner from '../components/Banner'
import Loading from '../components/Loading'
import DisplayMessage from '../components/DisplayMessage'

const TagFeed = () => {
  const { search } = useLocation()
  const { path, params } = useRouteMatch()
  const { offset, currentPage } = getPaginator(search)
  const apiURL = `/articles?limit=${limit}&offset=${offset}&tag=${params.slug}`
  const [{ response, loading, error }, doFetch] = useFetch(apiURL)

  useEffect(() => {
    doFetch()
  }, [doFetch, currentPage, params.slug])

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagName={params.slug} />
            {loading && <Loading />}
            {error && <DisplayMessage message="Error occurred" />}
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

export default TagFeed
