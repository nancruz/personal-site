import Layout from '../../components/Layout';
import PostList from '../../components/PostList';
import { getAllTags, getAllPostsByTag } from '../../api/post';
import styles from './Tag.module.css';

export async function getStaticPaths() {
    const tags = await getAllTags();
    const paths = tags.map(tag => ({
        params: { tag }
    }));

    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    return {
        props: {
            posts: await getAllPostsByTag(context.params.tag),
            tag: context.params.tag
        }
    }
}

export default function Tag({ posts, tag }) {
    return (
        <Layout pageTitle={`Tag: ${tag} | Nuno Cruz`}>
            <h1 className={styles.title}>{tag}</h1>
            <section>
                <PostList posts={posts} />
            </section>
        </Layout>
    )
}