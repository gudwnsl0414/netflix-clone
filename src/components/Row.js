import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import MovieModal from "./moviemodal";
import "./Row.css";

// import swiper core
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper css
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Row = ({ isLargeRow, title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  // const handleScroll = (direction) => {
  //   if (direction === "left")
  //     document.getElementById(id).scrollLeft -= window.innerWidth - 80;
  //   else document.getElementById(id).scrollLeft += window.innerWidth - 80;
  // };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20} // SwiperSlide 간격
        loop={true} // 끝까지 slide된 경우 처음으로 돌아가는 기능 여부
        navigation // arrow 버튼(<, >) 사용여부
        pagination={{ clickable: true }} // swiper 하단 .... 으로 page 표시여부
        breakpoints={{
          1378: {
            slidesPerView: 6, // 한번에 보이는 Slide수
            slidesPerGroup: 6, // 몇개씩 SLide 되는지
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <div className="slider">
          {/* <div
            className="slider__arrow-left"
            onClick={() => handleScroll("left")}
          >
            <span className="arrow">{"◀"}</span>
          </div> */}
          <div id={id} className="row__posters">
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                  onClick={() => handleClick(movie)}
                />
              </SwiperSlide>
            ))}
          </div>
          {/* <div
            className="slider__arrow-right"
            onClick={() => handleScroll("right")}
          >
            <span className="arrow">{"▶"}</span>
          </div> */}
        </div>
      </Swiper>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
};

export default Row;
