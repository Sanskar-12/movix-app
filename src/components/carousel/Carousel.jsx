import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import ContentWrapper from "../contentwrapper/ContentWrapper";
import CircleRating from "../circleRating/CircleRating";
import Genre from "../genre/Genre";
import Img from "../lazyLoadImage/Img"

const Carousel = ({ data, loading ,endpoint,title}) => {
  const carouselcontainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigation = useNavigate();

  const navigate = (dir) => {
    const container = carouselcontainer.current;

    const scrollAmt =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmt,
      behavior: "smooth",
    });
  };

  const skitem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">
          {title}
        </div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigate("left")}
        />

        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigate("right")}
        />

        {!loading ? (
          <div className="carouselItems" ref={carouselcontainer}>
            {data?.map((item) => {
              const posterurl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  className="carouselItem"
                  key={item.id}
                  onClick={() => navigation(`/${item.media_type || endpoint}/${item.id}`)}
                >
                  <div className="posterBlock">
                    <Img src={posterurl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genre data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skitem()}
            {skitem()}
            {skitem()}
            {skitem()}
            {skitem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
