import {useState , useEffect} from 'react';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'
import Genres from '../../components/Genres/Genres'
import useGenres from '../../hooks/useGenres';


import './Movie.css'

function Movie() {
    const [content , setContent] = useState([])
    const [page , setPage] = useState(1)
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genresforURL = useGenres(selectedGenres)
    const fetchMovie = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc
            &include_adult=false&include_video=false&page=${page}&with_genres=${genresforURL}`)
        
        setContent(data.results)
        setNumOfPages(data.total_pages);
    }
    useEffect(() => {
        window.scroll(0, 0);
        fetchMovie()
    },[page, genresforURL])
    return ( 
        <div>
            <span className="pageTilte">Movie</span>
            <Genres
                type="movie"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
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
                                media_type = 'movie'
                                vote_average ={val.vote_average}
                            />
                        )
                    })
                }
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div> 
    );
}

export default Movie;