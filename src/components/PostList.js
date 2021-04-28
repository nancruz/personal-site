import Link from 'next/link';
import PostMetadata from './PostMetadata';
import styles from './PostList.module.css';

export default function PostList({ posts = [] }) {
    return posts.map((post) => {
        return (
            <div key={post.slug}>
                <h2 className={styles.postTitle}><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
                <PostMetadata tags={post.tags} date={post.date} />
            </div>
        );
    })
}