import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchData } from "../../utils/api";
import ContentWrapper from "../../components/contentwrapper/ContentWrapper";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
import MovieCard from "../../components/moviecard/MovieCard";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pagenum, setPagenum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchIntialdata = () => {
    setLoading(true);
    fetchData(`/search/multi?query=${query}&page=${pagenum}`).then((res) => {
      setData(res);
      setPagenum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextdata = () => {
    fetchData(`/search/multi?query=${query}&page=${pagenum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res?.results],
        });
      } else {
        setData(res);
      }
      setPagenum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    setPagenum(1)
    fetchIntialdata();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } for '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextdata}
                hasMore={pagenum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry,Results Not Found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
