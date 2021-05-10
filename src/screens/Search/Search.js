import React, { useEffect, useState } from "react";
import {Form, Button} from 'react-bootstrap'

// Modules
import Carousel from 'react-elastic-carousel';
import { useHistory } from "react-router-dom";

// Styles
import './Search.css'
import '../../App.css'

// Redux
import {useSelector, useDispatch} from 'react-redux'
import {getRecentSuccess, searchSuccess} from '../../store/moviesStore'
import {searchMovie} from '../../api/Api'

// Components
import Header from '../../components/header/Header'
import Movie from '../../components/movie-card/Movie'

function Search({location}) {
    const history = useHistory();

    const {state} = location || {};
    const {searchHome} = state || {};
    const [search, setSearch] =useState(searchHome)
    const [page, setPage] = useState(1)

    // Redux
    const {searchInfo } = useSelector((state)=>{return state.movie})
    const dispatch = useDispatch();
   
    useEffect(async ()=> {
        if(search) {
            console.log('')
        } else {
        const searchInfo = await searchMovie({search})
        dispatch(searchSuccess(searchInfo))
        }
    }, [])

    const onChange = async (e) => {
        setTimeout(()=>{
         setSearch(e.target.value)
        }, 1500)
        console.log(search)
        const searchInfo = await searchMovie({search,page})
        dispatch(searchSuccess(searchInfo))
    }
    const onSubmit = async (e) => {
        const searchInfo = await searchMovie({search,page})
        dispatch(searchSuccess(searchInfo))
    }

    console.log('Search info:', page, searchInfo)
    return(
        <div className="homeContainer backgroundColor pb-5">
            <Header />
            <div className="bannerSection d-flex justify-content-center align-items-center flex-column">
                <div className="overlay"></div>
               <div className="bannerTextContainer">
                <h2 className="white30 text-center">Discover Movies</h2>
                    <h4 className="sub20 text-center">BatFlix is an upcoming movie finder on demand service. A platform made with visually stunning design of our own. Stay Home & Stay Safe.</h4>
                    <Form className="d-flex flex-row align-items-center mt-5">
                        <Form.Control type="text" placeholder="Search for Movie" className="mr-sm-2 searchbox"
                        onChange={onChange}
                        />
                        {/* <Button variant="outline-info"
                        className="searchbtn"
                        onClick={onSubmit}
                        >Search</Button> */}
                    </Form>
            </div>
               </div>
            <div>
            <div className=" px-5 mt-4">
                <h2 className="white30 listHeading">Search Results</h2>
                 <div className="row d-flex justify-content-center align-items-center  align-items-center">
                    {searchInfo&&searchInfo.results
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
                                            />
                                   </div>
                                )
                            )
                    })}
                </div>
            </div>
            <div className="pagination d-flex justify-content-center align-items-center mt-5">
            <Button className="loadmore" onClick={()=>{
                setPage(page-1)
                onSubmit()
                }}>Previous</Button>
                <Button className="loadmore ml-5" onClick={()=>{
                    setPage(page+1)
                    onSubmit()
                    }}>Next</Button>
            </div>
            </div>
        </div>
    )

}

export default Search