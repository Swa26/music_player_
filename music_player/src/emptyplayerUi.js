import React from 'react'
import mainlogo from './assets/logo.jpg';
const emptyplayerUi = () => {
    return (
        <div className='text-lg font-semibold'>
            <div className='flex justify-center mb-5'>
                <img src={mainlogo} className='h-8 inline-block w-8 rounded-full right-2 ring-black'></img>
                <p className='text-lg font-semibold'>Spotify</p>
            </div>
            <p className='text-slate-400'>Hey there!</p>
            <p>It's been quiet for an hour now..
            </p>
            <p>
                How about taking a break? Click the song to start listening :)
            </p>
        </div>
    )
}

export default emptyplayerUi