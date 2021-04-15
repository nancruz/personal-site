import Layout from '../components/Layout';
import styles from './Index.module.css';

export default function Home() {
    return (
        <Layout>
            <section>
                <h1 className={styles.greeting}>Hi I'm Nuno 👋</h1>
                <p className={styles.paragraph}>I'm a Frontend Engineer based in Lisbon 🇵🇹.</p>
                <p className={styles.paragraph}>Currently working at <a href='https://www.sky.com'>Sky UK</a> building <a href='https://www.peacocktv.com'>Peacock</a> 🦚 - the best streaming platform.</p>
            </section>
        </Layout>
    );
}