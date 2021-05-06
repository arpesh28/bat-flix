import React, { useEffect, useState } from "react";

// External Modules
import Carousel from 'react-elastic-carousel';

// Styles
import './HomePage.css'
import '../../App.css'

// Redux
import {useSelector, useDispatch} from 'react-redux'
import {getRecentSuccess, getPopularSuccess} from '../../store/moviesStore'
import {searchMovie, getrecent, getPopular } from '../../api/Api'

// Components
import Header from '../../components/header/Header'
import Movie from '../../components/movie-card/Movie'

function HomePage() {
    const [counter, setCounter] = useState(0)
    const [grid, setGrid] = useState(1)
    // Redux
    const {recentInfo, popularInfo} = useSelector((state)=>{return state.movie})
    const dispatch = useDispatch();
   
    useEffect(async ()=> {
        const recentInfo = await getrecent()
        const popularInfo = await getPopular()
        dispatch(getRecentSuccess(recentInfo))
        dispatch(getPopularSuccess(popularInfo))
    }, [])

    const {results} = recentInfo || {}

    console.log(recentInfo)
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1000, itemsToShow: 4 },
        { width: 1400, itemsToShow: 5 },
        { width: 1600, itemsToShow: 6 },
      ];
    return(
        <div className="homeContainer backgroundColor">
            <Header />
            <div className="bannerSection d-flex justify-content-center align-items-center flex-column">
                <div className="overlay"></div>
               <div className="bannerTextContainer">
                <h2 className="white30 text-center">Discover Movies</h2>
                    <h4 className="sub20 text-center">BatFlix is an upcoming movie finder on demand service. A platform made with visually stunning design of our own. Stay Home & Stay Safe.</h4>
            </div>
               </div>
            <div>
                <div className="recentContainer px-5  my-4 ">
                <h2 className="white30 listHeading">Newly Added</h2>
               
                <Carousel
                 className="d-flex justify-content-center"
                 breakPoints={breakPoints}>
                    {recentInfo&&recentInfo.results.map((item)=>{
                            return(
                                    item.poster_path&&
                                        <div
                                        key={item.id}
                                        className="col-12 col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center">
                                           <Movie  
                                                type="latest"
                                                image={item.poster_path} />
                                       </div>
                                )
                        })}
                </Carousel>
            </div>

            <div className=" px-5 mt-4">
                <h2 className="white30 listHeading">Popular Movies</h2>
                 <div className="row d-flex justify-content-center align-items-center  align-items-center">
                    {popularInfo&&popularInfo.results
                    .map((item)=>{
                        return(
                                item.backdrop_path&&(
                                    <div
                                    key={item.id}
                                    className="col-12 col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 d-flex justify-content-center">
                                       <Movie  
                                            type="popular"
                                            image={item.backdrop_path}
                                            likes={item.vote_count}
                                            title={item.title}
                                            popularity={item.popularity}
                                            />
                                   </div>
                                )
                            )
                    })}
                    
                </div>
            </div>

            </div>
        </div>
    )

}

export default HomePage