import {useState , useEffect} from 'react';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent'
import './Search.css'

function Search() {
    const [content , setContent] = useState([])
    const fetchSearch = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/search/company?api_key=${process.env.REACT_APP_API_KEY}&&page=1`)
        
        setContent(data.results)
    }
    useEffect(() => {
        fetchSearch()
    },[])
    return ( 
        <div>
            <span className="pageTilte">Search</span>
            <div className="search">
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

export default Search;