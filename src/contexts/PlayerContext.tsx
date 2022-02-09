//PLAYER CONTEXTS
import { createContext, useState, ReactNode, useContext } from 'react';

//EPISODE
type Episode={
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
};

//PLAYER CONTEXT TYPES
type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setPlayingState: (state: boolean) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
};

//PLAYER CONTEXT
export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

//PLAYER CONTEXT PROVIDER FUNCTION
export function PlayerContextProvider({ children }){
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [episodeList, setEpisodeList] = useState([]);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  //PLAY FUNCTION
  function play(episode: Episode){
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  //PLAYLIST FUNCTION
  function playList(list: Episode[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  //TOOGLEPLAY FUNCTION
  function togglePlay(){
    setIsPlaying(!isPlaying);
  }

  //TOGGLELOOP FUNCTION
  function toggleLoop(){
    setIsLooping(!isLooping);
  }

  //TOOGLE SHUFFLE FUNCTION
  function toggleShuffle(){
    setIsShuffling(!isShuffling);
  }

  //SET PLAY STATE FUNCTION
  function setPlayingState(state: boolean){
    setIsPlaying(state);
  }

  //CLEAR PLAYER STATE
  function clearPlayerState(){
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPrevious = currentEpisodeIndex > 0; 
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

  //PLAYNEXT FUNCTION
  function playNext(){
    if (isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);

      //CURRENT EPISODE
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    }else if (hasNext){
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
    }

  //PLAY PREVIOUS FUNCTION
  function playPrevious(){
    if(hasPrevious){
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  //RETURN
  return(
    <PlayerContext.Provider value={{ 
      episodeList, 
      currentEpisodeIndex, 
      play,
      isPlaying,
      isShuffling,
      togglePlay,
      setPlayingState,
      playList,
      playNext,
      playPrevious,
      hasNext,
      hasPrevious,
      isLooping,
      toggleLoop,
      toggleShuffle,
      clearPlayerState,
    }}>
        { children }
    </PlayerContext.Provider>
  )
}

//USEPLAYER
export const usePlayer = () => {
  return useContext(PlayerContext);
}
