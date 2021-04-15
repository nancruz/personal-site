import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

export default function Layout(props) {
    return (
        <div className={styles.layout}>
            <Header />
            <div>
                {props.children}
            </div>
            <Footer />
        </div>
    )
}