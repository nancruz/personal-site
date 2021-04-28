import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

const metaDefaults = {
    description: 'Nuno Cruz Personal Website'
};

export default function Layout({ pageTitle, description = metaDefaults.description, children}) {
    return (
        <div>
            <Head>
                <title>{pageTitle}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={description}></meta>
            </Head>
            <div className={styles.layout}>
                <Header />
                <div>
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    )
}