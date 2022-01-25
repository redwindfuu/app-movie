import {useState , useEffect} from 'react';
import { useNavigate }  from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';

const values = ['/','/movie','/seriestv','/search']

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    navigate(values[value]);
  },[value])
  return (
    <Box 
      className="navMainBox"   
      sx={{  width: 500 , 
             position: 'fixed',
             bottom: 0,
             zIndex: 100
          }}>
      <BottomNavigation
        style={{  backgroundColor: 'black',}}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction 
          label="Trending" 
          icon={<WhatshotIcon />} 
          style={{color: 'white'}}
        />
        <BottomNavigationAction 
          label="Movies" 
          icon={<MovieIcon />} 
          style={{color: 'white'}}
        />
        <BottomNavigationAction 
          label="TV Series" 
          icon={<LiveTvIcon />} 
          style={{color: 'white'}}
        />
        <BottomNavigationAction 
          label="Search" 
          icon={<SearchIcon />} 
          style={{color: 'white'}}
        />
      </BottomNavigation>
    </Box>
  );
}
