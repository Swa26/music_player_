import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward, faEllipsisH, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

function PlayerUi({ song, onNext, onPrevious }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
            };
        }
    }, []);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handlePrevious = () => {
        onPrevious();
    };

    const handleNext = () => {
        onNext();
    };

    const handleSeek = (event) => {
        const seekTime = (event.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const playPauseIcon = isPlaying ? faPause : faPlay;

    return (
        <div className='flex flex-col items-start justify-center h-full'>
            <div className='mb-4'>
                <p className='font-bold text-3xl'>{song.name}</p>
                <p className='text-md font-light'>{song.artist}</p>
            </div>
            <img className='h-72 w-72 lg:h-96 lg:w-96 rounded-md' src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />
            <div className='w-full relative mt-0'>
                <input
                    type="range"
                    value={(currentTime / audioRef.current?.duration) * 100 || 0}
                    onChange={handleSeek}
                    className="w-full h-1 bg-white appearance-none rounded-lg overflow-hidden"
                />
                <div
                    className="absolute top-3.5 h-1 rounded-lg"
                    style={{ width: `${(currentTime / audioRef.current?.duration) * 100}%`, background: '#767676' }}
                />
            </div>

            <div className='w-full mt-2'>
                <div className='flex justify-between'>
                    <button className="mr-2 bg-gray-900 rounded-full h-8 w-8">
                        <FontAwesomeIcon className='text-white' icon={faEllipsisH} />
                    </button>
                    <div className="flex">
                        <button onClick={handlePrevious} className="mr-2">
                            <FontAwesomeIcon icon={faStepBackward} />
                        </button>

                        <button onClick={togglePlay} className="mr-2 bg-white rounded-full h-10 w-10">
                            <FontAwesomeIcon className='text-black' icon={playPauseIcon} />
                        </button>

                        <button onClick={handleNext} className="mr-2">
                            <FontAwesomeIcon icon={faStepForward} />
                        </button>
                    </div>
                    <button className="mr-2 bg-gray-900 rounded-full h-8 w-8">
                        <FontAwesomeIcon className='text-white text-sm text-center' icon={faVolumeHigh} />
                    </button>
                </div>
            </div>
            <audio ref={audioRef} src={song.url} preload='auto'></audio>

        </div>
    );
}

export default PlayerUi;
