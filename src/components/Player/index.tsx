//PLAYER

//IMPORTING
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

//PLAYER FUNCTION
export default function Player(){
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    //PLAYER
    const { 
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        playNext,
        playPrevious,
        isLooping,
        isShuffling,
        hasNext,
        hasPrevious,
        clearPlayerState
    } = usePlayer();

    //AUDIO USE EFFECT
    useEffect(() => {
        if(!audioRef.current){
            return;
        }

        if(isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
    }, [isPlaying])

    //SETUP PROGRESS FUNCTION
    function setupProgressListener(){
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));
        });
    }

    //HANDLE SEEK FUNCTION
    function handleSeek(amount: number){
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    //HANDLE EPISODE FUNCTION
    function handleEpisodeEnded(){
        if (hasNext){
            playNext();
        }else{
            clearPlayerState();
        }
    }
    const episode = episodeList[currentEpisodeIndex];

    //RETURN
    return(
        <div className={styles.playerContainer}>
            {/*HEADER PROPERTIES*/}
            <header>
                <img src="./playing.svg" alt="playing" />
                <strong>Tocando agora {episode?.title}</strong>
            </header>
            {/*EPISODE*/}
            { episode ? (
                <div>
                    <Image 
                        width={592} 
                        height={592} 
                        src={episode.thumbnail} 
                        objectFit="cover"
                    />
                    <strong>{episode.title}</strong>
                    <p>{episode.members}</p>
                </div>
            ):(
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir</strong>
                </div>
            )}
            {/*FOOTER*/}
            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        { episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{backgroundColor: '#04d361'}}
                                railStyle={{backgroundColor: '#9f75ff'}}
                                handleStyle={{borderColor: '#04d361', borderWidth: 4}}
                            />
                        ) : (
                            <div className={styles.emptySlider} />
                        ) }
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </div>

                { episode && (
                    <audio
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        loop={isLooping}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                    />
                )}

                <div className={styles.buttons}>
                    <button 
                        type="button"
                        disabled={!episode || episodeList.length == 1}
                        onClick={toggleShuffle}
                        className={isShuffling ? styles.isActive : ''}
                    >
                        <img src="/shuffle.svg" alt="shuffle" />
                    </button>
                    <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
                        <img src="/play-previous.svg" alt="play previous" />
                    </button>
                    <button 
                        type="button" 
                        className={styles.playButton} 
                        disabled={!episode}
                        onClick={togglePlay}
                    >
                        { isPlaying
                            ? <img src="/pause.svg" alt="pause" />
                            : <img src="/play.svg" alt="play" />
                        }
                    </button>
                    <button type="button" onClick={playNext} disabled={!episode  || !hasNext}>
                        <img src="/play-next.svg" alt="play next" />
                    </button>
                    <button 
                        type="button" 
                        disabled={!episode}
                        onClick={toggleLoop}
                        className={isLooping ? styles.isActive : ''}
                    >
                        <img src="/repeat.svg" alt="repeat" />
                    </button>
                </div>
            </footer>
        </div>
    );
}
