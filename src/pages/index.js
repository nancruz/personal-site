import Layout from "../components/Layout";
import styles from "./Index.module.css";

export default function Home() {
    return (
        <Layout pageTitle="Nuno's Personal Website">
            <section>
                <h1 className={styles.greeting}>Hi I'm Nuno 👋</h1>
                <p className={styles.paragraph}>
                    Once a frontend engineer, now an engineering manager at
                    Sky—I traded code for calendars (and way too many meetings).
                    I write about the wild ride of engineering management on{" "}
                    <a href="https://nunocruz.substack.com">my Substack.</a>
                </p>
            </section>
        </Layout>
    );
}
