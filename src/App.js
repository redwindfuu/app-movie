import React from 'react';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/MainNav/MainNav'
import Container from '@mui/material/Container';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';

import Trending from './pages/Trending/Trending';
import Search from './pages/Search/Search';
import Movie from './pages/Movie/Movie';
import Seriestv from './pages/Seriestv/Seriestv';


import './App.css';

function App() {
  return (
    <Router>
      <Header/>
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} ></Route>
            <Route path="/movie" element={<Movie />} ></Route>
            <Route path="/seriestv" element={<Seriestv />} ></Route>
            <Route path="/search" element={<Search />} ></Route>
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation/>
    </Router>
    
  );
}

export default App;
