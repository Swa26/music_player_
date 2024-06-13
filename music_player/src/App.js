import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import mainlogo from './assets/logo.jpg';
import profilelogo from './assets/profile.png';
import SearchBar from './searchbar';
import Songs from './songs';
import axios from 'axios';
import PlayerUi from './playerUi';
import EmptyplayerUi from './emptyplayerUi';

function App() {
  const [top_track, settop_track] = useState(false);
  const [songsData, setSongsData] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSong, setFilteredSong] = useState([]);
  
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('https://cms.samespace.com/items/songs');
        setSongsData(response.data.data || []);
        setFilteredSong(response.data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);


  useEffect(() => {
    setFilteredSong(
      songsData.filter(song =>
        song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, songsData]);

  const handleSongClick = (song) => {
    setSelectedSong(song);
  };

  const handleNextSong = () => {
    if (selectedSong) {
      const currentIndex = songsData.findIndex(song => song.id === selectedSong.id);
      const nextIndex = (currentIndex + 1) % songsData.length;
      setSelectedSong(songsData[nextIndex]);
    }
  };

  const handlePreviousSong = () => {
    if (selectedSong) {
      const currentIndex = songsData.findIndex(song => song.id === selectedSong.id);
      const prevIndex = (currentIndex - 1 + songsData.length) % songsData.length;
      setSelectedSong(songsData[prevIndex]);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const appBackgroundStyle = selectedSong
  ? {
      background: `linear-gradient(135deg, ${selectedSong.accent} 0%, #000000 100%)`
    }
  : {
      backgroundColor: 'black'
    };
  return (
    <div className="w-screen h-screen" style={appBackgroundStyle}>
      <div className='flex flex-col lg:flex-row h-screen'>
        <div className='lg:w-1/5 w-full flex p-5 h-1/5 lg:h-full lg:flex-col justify-between mr-2 ml-2'>
          <div className='flex'>
            <img src={mainlogo} className='h-8 inline-block w-8 rounded-full right-2 ring-black'></img>
            <p className='text-lg font-semibold'>Spotify</p>
          </div>
          <div>
              <img className='inline-block h-10 w-10 rounded-full right-2 ring-black' src={profilelogo}></img>
          </div>
        </div>
        <div className='lg:w-1/4 w-full p-4'>
          <div className='flex'>
            <p onClick={()=>settop_track(!top_track)} className={`cursor-pointer mr-3 ml-3 text-lg font-semibold mt-4 ${!top_track ? 'text-white' : 'text-gray-500'}`}>For You</p>
            <p onClick={()=>settop_track(!top_track)} className={`cursor-pointer text-lg font-semibold mt-4 ${top_track ? 'text-white' : 'text-gray-500'}`}>Top Tracks</p>
          </div>
          <div className='m-2'>
          <SearchBar background={appBackgroundStyle} searchQuery={searchQuery} setSearchQuery={setSearchQuery}  />
          </div>
          <div>
              <Songs songs={filteredSong} top_track={top_track} onSongClick={handleSongClick}/>
          </div>
        </div>
        {
          selectedSong?<div className='lg:w-2/4 w-full flex justify-center items-center'>
          {selectedSong && <PlayerUi song={selectedSong} onNext={handleNextSong} onPrevious={handlePreviousSong} />}
          {selectedSong && <audio src={selectedSong.url} preload='auto'></audio>}
          </div>:<div className='lg:w-2/4 w-full flex justify-center items-center'>
          <EmptyplayerUi/>
          </div>
        }        
      </div>
    </div>
  );
}

export default App;