import { useState, useEffect } from "react";
import axios from "axios";
import { createTheme , ThemeProvider} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import SingleContent from '../../components/SingleContent/SingleContent'
import CustomPagination from '../../components/Pagination/CustomPagination'

import "./Search.css";

function Search() {
  const [content, setContent] = useState([]);
  const [checkNull, setCheckNull] = useState(true);
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const darkTheme = createTheme({
    palette: {
        type:'dark',
        primary: {
            main: "#fff",
          },
    }
}) 
  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setCheckNull( content.length == 0 );
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
      window.scroll(0, 0);
      fetchSearch();
  }, [page, type]);
  return(
    <div>
        <ThemeProvider theme={darkTheme}>
            <div className="search">
                <TextField 
                    style={{ flex: 1 }}
                    className="searchBox"
                    label="Search"
                    variant="filled"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button 
                    variant="contained" 
                    style={{ marginLeft: 10 }}
                    onClick={fetchSearch}
                >
                    <SearchIcon/>
                </Button>
            </div>
            <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
                setType(newValue);
                setPage(1);
            }}
            style={{ paddingBottom: 5 }}
            aria-label="disabled tabs example"
            >
            <Tab style={{ width: "50%" }} label="Search Movies" />
            <Tab style={{ width: "50%" }} label="Search TV Series" />
            </Tabs>
        </ThemeProvider>
        <div className="trending">
        {content &&
        content.map((c) => (
            <SingleContent
            key={c.id}
            id={c.id}
            poster={c.poster_path}
            title={c.title || c.name}
            date={c.first_air_date || c.release_date}
            media_type={type ? "tv" : "movie"}
            vote_average={c.vote_average}
            />
        ))}
        {searchText && checkNull &&
        (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
    </div>
    {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
    )}
    </div>
  ) 
  
}

export default Search;
