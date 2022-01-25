import {useState , useEffect} from 'react';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent'
import './Seriestv.css'

function Seriestv() {
    const [content , setContent] = useState([])
    const fetchSeriestv = async () => {
        const {data} = await axios.get(
            `https://api.themoviedb.org/3/Seriestv/all/day?api_key=${process.env.REACT_APP_API_KEY}`)
        
        setContent(data.results)
    }
    useEffect(() => {
        fetchSeriestv()
    },[])
    return ( 
        <div>
            <span className="pageTilte">Seriestv</span>
            <div className="Seriestv">
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

export default Seriestv;