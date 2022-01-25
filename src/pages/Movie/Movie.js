import {useState , useEffect} from 'react';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent'
import './Movie.css'

function Movie() {
    const [content , setContent] = useState([])
    const fetchMovie = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/Movie/all/day?api_key=${process.env.REACT_APP_API_KEY}`)
        
        setContent(data.results)
    }
    useEffect(() => {
        fetchMovie()
    },[])
    return ( 
        <div>
            <span className="pageTilte">Movie</span>
            <div className="movie">
                {
                    content && content.map((val) =>{
                        return (
                            <SingleContent 
                                key={val.id} 
                                id ={val.id} 
                                poster = {val.poster_path}
                                title = {val.title || val.name}
                                date = {val.first_air_date || val.release_date}
                                media_type = {val.media_type}
                                vote_average ={val.vote_average}
                            />
                        )
                    })
                }
            </div>
        </div> 
    );
}

export default Movie;