const api = 'https://api.themoviedb.org/3'
const api_key = process.env.REACT_APP_API

export const searchMovie = ({search, page}) => {
    let searchLink
    if(search) {
     searchLink = `${api}/search/movie?api_key=${api_key}&language=en-US&page=${page}&query=${search}`
    } else {
     searchLink = `${api}/movie/popular?api_key=${api_key}&language=en-US&page=${page}`
    }
    return fetch(searchLink)
    .then(data=>data.json())
    .then(data=>{
        return data
    })
   
}

 export const getrecent = () => {
    return fetch(`${api}/movie/top_rated?api_key=${api_key}&language=en-US&sort_by=release_date.desc&page=1`)
    .then(data=>data.json())
    .then(data=>{
        return data
    })
    .catch((e)=>{
        return console.log("error:",e)
    }) 
}

export const getPopular = () => {
   return fetch(`${api}/movie/popular?api_key=${api_key}&language=en-US&page=1`)
   .then(data=>data.json())
   .then(data=>{
       return data
   })
   .catch((e)=>{
       return console.log("error:",e)
   }) 
}



