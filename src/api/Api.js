const api = 'https://api.themoviedb.org/3'
const api_key = process.env.REACT_APP_API

export const searchMovie = ({search, page}) => {
    return fetch(`${api}/movie/latest?api_key=${api_key}&language=en-US&page=${page}&query=${search}`)
    .then(data=>data.json())
    .then(data=>{
        console.log('Search Movie:', data)
        return data
    })
    .catch((e)=>{
        return console.log("error:",e)
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
       console.log(data)
       return data
   })
   .catch((e)=>{
       return console.log("error:",e)
   }) 
}


