import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle, AiOutlineHeart } from "react-icons/ai"
import { dataSong } from "@/lib/dataStaticSong"
import { connect } from 'react-redux';
import { Dispatch, SetStateAction } from 'react';
interface Props {
  src: string;
  index: number;
}

type HandlePlayPauseProps = {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
};
const mapStateToProps = (state: any) => {
  return {
    currentTrackIndex: state.currentTrackIndex,
    isPlaying: state.isPlaying
  };
};

const mapDispatchToProps = (dispatch: any)=> {
  return {
    playTrack: (index: number) => {
      dispatch({ type: 'PLAY_TRACK', payload: index });
    },
    pauseTrack: () => {
      dispatch({ type: 'PAUSE_TRACK' });
    }
  };
};


const MediaPlayer: React.FC<Props> = ({ src, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const mediaRef = useRef<HTMLAudioElement>(null);

  const handlePlaying = (index: number) => {
    togglePlay();
    
  }
  const togglePlay = () => {
    handleLoadedMetadataAudio();
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      setCurrentTime(mediaRef.current.currentTime);
    }
  };

  const handleProgressClick = (event: any) => {
    if (mediaRef.current) {
      const newTime = (event.nativeEvent.offsetX / event.currentTarget.offsetWidth) * duration;
      mediaRef.current.currentTime = newTime;
    }
  };
  const handleLoadedMetadataAudio = () => {
    if (mediaRef.current) {
      setDuration(mediaRef.current?.duration);
    }
  };
  useEffect(() => {
    if (mediaRef.current) {
      const media = mediaRef.current;

      console.log('Duration:', media.duration);
      const handleLoadedMetadata = () => {
        console.log("aa");
        setDuration(media.duration);
        setCurrentTime(media.currentTime);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(media.currentTime);
      };

      media.addEventListener('loadedmetadata', handleLoadedMetadata);
      media.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        media.removeEventListener('loadedmetadata', handleLoadedMetadata);
        media.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [src]);

  useEffect(() => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.play();
      } else {
        mediaRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className='flex items-center shadow-lg rounded-full py-1'>
      <audio ref={mediaRef} src={src} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={(e: any) => setDuration(e.currentTarget.duration)} />
      <div onClick={() => handlePlaying(index)}>
        {!isPlaying ?
          <AiFillPlayCircle className='w-6 h-6'></AiFillPlayCircle>
          : <AiFillPauseCircle className='w-6 h-6'></AiFillPauseCircle>}
      </div>
      <div className='flex space-x-4 ml-3 items-center '>
        <div className='basis-4/6 flex items-center space-x-2'>
          <span>{formatTime(currentTime)}</span>
          <progress
            value={currentTime}
            max={duration}
            onClick={handleProgressClick}
            className='rounded-xl h-2 w-2/3 text-gray-300 shadow-md'
          />
          <span>{formatTime(duration)}</span>
        </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.0001}
        value={volume}
        onChange={handleVolumeChange}
        className='appearance-none w-16 rounded-xl bg-none py-1 px-2'
      />
      </div>
    </div>
  );
};
function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const paddedSeconds = seconds.toString().padStart(2, '0');
  return `${minutes}:${paddedSeconds}`;
}


export default connect(mapStateToProps, mapDispatchToProps)(MediaPlayer);