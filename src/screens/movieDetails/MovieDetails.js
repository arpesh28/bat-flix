import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// Modules
import Carousel from 'react-elastic-carousel';
import { useHistory } from 'react-router-dom';

// Styles
import './MovieDetails.css';
import '../../App.css';

// Images
import star from '../../Images/star.svg'

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getMovieDetailsSuccess, getSimilarMoviesSuccess } from '../../store/moviesStore';
import { getDetails, getSimilar } from '../../api/Api';

// Components
import Header from '../../components/header/Header';
import Movie from '../../components/movie-card/Movie';

function MovieDetails({
    location
}) {
  
  // Router
  const history = useHistory();
  const {id} = location.state || {}

  const [counter, setCounter] = useState(0);
  const [grid, setGrid] = useState(1);

  // Redux
  const { movieInfo, similarInfo} = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();

  useEffect(async () => {
    const movieInfo = await getDetails({id});
    const similarInfo = await getSimilar({id});
    dispatch(getMovieDetailsSuccess(movieInfo));
    dispatch(getSimilarMoviesSuccess(similarInfo));
  }, [id]);
  console.log('movieInfo',similarInfo)

  const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 5 },
    { width: 1000, itemsToShow: 6 },
    { width: 1400, itemsToShow: 8 },
    { width: 1600, itemsToShow: 9 },
  ];
  return (
    <div className='detailsContainer backgroundColor '>
      <Header />
      <div className="row detailsSubContainer align-items-center">
        <div className="col-12 col-md-4 d-flex justify-content-center">
        <img src={`https://image.tmdb.org/t/p/w500/${movieInfo&&movieInfo.poster_path}`} alt="Image" className="posterImage img-fluid"  />
        </div>
        <div className="col-12 col-md-8 detailstextContainer">
          <div className="d-flex justify-content-between align-items-center movieHead">
          <h2 className="heading">{movieInfo&&movieInfo.title}</h2>
          <div className="d-flex flex-row align-items-center justify-content-center">
          <img src={star} alt="Image"  className="star" />
          <h4 className="rating">
          {movieInfo&&movieInfo.vote_average}
          </h4>
          </div>
          </div>
          <p className="subtext"> {movieInfo&&movieInfo.overview} </p>
          <h2 className="genresHead white25">Genres</h2>
          <div className="d-flex flex-row genres justify-content-between ">
          {movieInfo&&movieInfo.genres&&movieInfo.genres&&movieInfo.genres.map((g)=>{
            return(
              <h3>{g.name}</h3>
            )
          })}
          </div>
          <Button className="trailerbtn">
            Watch trailer
          </Button>
        </div>
      </div>
      <div>
        <div className='recentContainer px-5 '>
        <h2 className="white30 listHeading">Similar Movies</h2>
          <Carousel
            className='d-flex justify-content-center'
            breakPoints={breakPoints}
          >
            {similarInfo &&
              similarInfo.results.map((item) => {
                return (
                  item.poster_path && (
                    <div
                      key={item.id}
                      className='col-12 col-xs-6 col-sm-6 col-md-3 col-lg-1 col-xl-1 d-flex justify-content-center'
                    >
                      <Movie
                        type='latest'
                        image={item.poster_path}
                        id={item.id}
                      />
                    </div>
                  )
                );
              })}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
