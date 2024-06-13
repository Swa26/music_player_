import React, { useEffect, useState } from 'react';

function Songs({ songs,top_track,onSongClick }) {
  const filteredSongs = top_track ? songs.filter(song => song.top_track) : songs;
  return (
    <div className='overflow-y-auto h-80 lg:h-auto'>
        {filteredSongs.map((song) => (
          <div key={song.id} className='cursor-pointer flex justify-between mb-3 'onClick={() => onSongClick(song)}>
            <div className='flex justify-between'>
              <img className='inline-block h-10 w-10 rounded-full right-2 ring-black m-2' src={`https://cms.samespace.com/assets/${song.cover}`}></img>
              <div className='m-1'>
                <p className='text-md font-normal'>{song.name}</p>
                <p className='text-xs font-extralight text-gray-500'>{song.artist}</p>
              </div>
            </div>
            <p className='text-md font-normal text-gray-500 m-2'>4.00</p>
          </div>
          
        ))}
      </div>
  );
}
export default Songs;
