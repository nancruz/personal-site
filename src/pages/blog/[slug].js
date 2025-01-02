import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Layout from '../../components/Layout';
import PostMetadata from '../../components/PostMetadata';
import { getAllPosts, getPostBySlug } from '../../api/post';
import styles from './Post.module.css';

export async function getStaticPaths() {
    let paths = await getAllPosts();

    paths = paths.map(post => ({
        params: { slug: post.slug }
    }));

    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    return {
        props: await getPostBySlug(context.params.slug)
    }
}

const components = {
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter style={atomDark} language={match[1]} showLineNumbers children={String(children).replace(/\n$/, '')} {...props} />
        ) : (
            <code className={className} {...props} />
        );
    }
}

export default function Post({ title, content, tags, date, description }) {
    return (
        <Layout pageTitle={`${title} | Nuno Cruz`} description={description}>
            <h1>{title}</h1>
            <PostMetadata tags={tags} date={date} />
            <article className={styles.article}>
                <ReactMarkdown children={content} components={components}/>
            </article>
        </Layout>
    )
}