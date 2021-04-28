import Layout from '../../components/Layout';
import PostList from '../../components/PostList';
import { getAllPosts } from '../../api/post';
import styles from './Blog.module.css';

export default function Blog({ posts }) {
    return (
        <Layout pageTitle="Blog | Nuno Cruz">
            <h1 className={styles.title}>Blog</h1>
            <section>
                <PostList posts={posts} />
            </section>
        </Layout>
    );
}

export async function getStaticProps(context) {
  return {
    props: {
        posts: await getAllPosts()
    }
  };
}