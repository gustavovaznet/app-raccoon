//HEADER
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './styles.module.scss';

//HEADER FUNCTION
export default function Header(){
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
});

    //RETURN
    return(
        <header className={styles.headerContainer}>
            <img src="./logo.svg" alt="logo" />
            <p>O seu tech podcast</p>
            <span>{currentDate}</span>
        </header>
    );
}
