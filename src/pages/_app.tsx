//APP FILE

//IMPORTING
import Header from '../components/Header';
import Player from '../components/Player';
import '../styles/global.scss';
import styles from '../styles/app.module.scss';
import { PlayerContextProvider } from '../contexts/PlayerContext';

//FUNCTION MY APP
function MyApp({ Component, pageProps }) {
  return(
    <PlayerContextProvider>
      <div className={styles.wrapper}>
          <Player />
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
      </div>
    </PlayerContextProvider>
  );
}

//EXPORTING MY APP
export default MyApp
