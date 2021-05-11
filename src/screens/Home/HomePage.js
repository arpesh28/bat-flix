import React, { useEffect, useState } from "react";
import {Form, Button} from 'react-bootstrap'

// Modules
import Carousel from 'react-elastic-carousel';
import { useHistory } from "react-router-dom";

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
    const history = useHistory();

    const [counter, setCounter] = useState(0)
    const [grid, setGrid] = useState(1)
    const [searchHome, setSearchHome] = useState('')

    // Redux
    const {recentInfo, popularInfo} = useSelector((state)=>{return state.movie})
    const dispatch = useDispatch();
   
    useEffect(async ()=> {
        const recentInfo = await getrecent()
        const popularInfo = await getPopular()
        dispatch(getRecentSuccess(recentInfo))
        dispatch(getPopularSuccess(popularInfo))
    }, [])

    console.log(recentInfo, popularInfo)
    const breakPoints = [
        { width: 1, itemsToShow: 2 },
        { width: 550, itemsToShow: 3},
        { width: 768, itemsToShow: 5 },
        { width: 1000, itemsToShow: 6 },
        { width: 1400, itemsToShow: 8 },
        { width: 1600, itemsToShow: 9 },
      ];
    return(
        <div className="homeContainer backgroundColor">
            <Header />
            <div className="bannerSection d-flex justify-content-center align-items-center flex-column">
                <div className="overlay"></div>
               <div className="bannerTextContainer">
                <h2 className="white30 text-center">Discover Movies</h2>
                    <h4 className="sub20 text-center">BatFlix is an upcoming movie finder on demand service. A platform made with visually stunning design of our own. Stay Home & Stay Safe.</h4>
                    <Form className="d-flex flex-row align-items-center mt-5">
                        <Form.Control type="text" placeholder="Search for Movie" className="mr-sm-2 searchbox"
                        onChange={(e)=>{
                            setSearchHome(e.target.value)
                        }}
                        />
                        <Button variant="outline-info"
                        className="searchbtn"
                        onClick={()=>{
                            history.push({
                                pathname: '/search',
                                state: { searchHome: searchHome  }
                              })
                        }}
                        >Search</Button>
                    </Form>
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
                                        className="col-12 col-xs-6 col-sm-6 col-md-3 col-lg-1 col-xl-1 d-flex justify-content-center">
                                           <Movie  
                                                type="latest"
                                                image={item.poster_path} 
                                                id={item.id}
                                                />
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
                                    className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center">
                                       <Movie  
                                            type="popular"
                                            image={item.backdrop_path}
                                            likes={item.vote_count}
                                            title={item.title}
                                            popularity={item.popularity}
                                            id={item.id}

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