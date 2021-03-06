//SPISODES

//IMPORTING
import { GetStaticPaths, GetStaticProps } from 'next';
import { api } from '../../services/api';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import styles from './episode.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { usePlayer } from '../../contexts/PlayerContext';

//EPISODE
type Episode = {
    id: string;
    title: string;
    thumbnail: string;
    members: string;
    duration: number;
    durationAsString: string;
    url: string;
    description: string;
    publishedAt: string;
};

//EPISODE PROPS
type EpisodeProps = {
    episode: Episode;
}

//EXPORTING EPISODE
export default function Episode({ episode }: EpisodeProps){
    //PLAY
    const { play } = usePlayer();

    //RETURN
    return(
        <div className={styles.episode}>
            {/*HEAD PROPERTIES*/}
            <Head>
                <title>
                    {episode.title} | Podcast
                </title>
            </Head>
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>
                <Image 
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover"
                />
                <button type="button" onClick={() => play(episode)}>
                    <img src="/play.svg" alt="playing episode" />
                </button>
            </div>
            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>
            <div 
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: episode.description }}
            />
        </div>
    )
}

//GET STATIC PATHS
export const getStaticPaths: GetStaticPaths = async () =>{
    return{
        paths: [],
        fallback: 'blocking'
    }
}

//GET STATIC PROPS
export const getStaticProps: GetStaticProps = async (ctx) =>{
    const { slug } = ctx.params;
    const { data } = await api.get(`/episodes/${slug}`)

    //EPISODE
    const episode = {
            id: data.id,
            title: data.title,
            thumbnail: data.thumbnail,
            members: data.members,
            publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
            duration: Number(data.file.duration),
            durationAsString: convertDurationToTimeString(Number(data.file.duration)),
            description: data.description,
            url: data.file.url
    }
    
    //RETURN PROPS
    return{
        props: {
            episode
        },
        revalidate: 60 * 60 * 24,
    }
}
