import { useState, useEffect } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import  CustomPagination  from "../../components/Pagination/CustomPagination"
import "./Trending.css";

function Trending() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setContent(data.results);
  };
  useEffect(() => {
    fetchTrending();
  }, [page]);
  return (
    <div>
      <span className="pageTilte">Trending</span>
      <div className="trending">
        {content &&
          content.map((val) => {
            return (
              <SingleContent
                key={val.id}
                id={val.id}
                poster={val.poster_path}
                title={val.title || val.name}
                date={val.first_air_date || val.release_date}
                media_type={val.media_type}
                vote_average={val.vote_average}
              />
            );
          })}
      </div>
      <CustomPagination setPage = {setPage}/>
    </div>
  );
}

export default Trending;
