import Link from 'next/link';
import styles from './PostMetadata.module.css';

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

function formatTs(ts) {
    const date = new Date(ts);

    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
}

function Tags({ tags = []}) {
    return (tags.map((tag, index) => {
        const isLastTag = index + 1 === tags.length;

        return (
            (<span key={tag}>
                <Link href={`/tags/${tag}`} legacyBehavior>{tag}</Link>
                {!isLastTag && ', '}
            </span>)
        );
    }));
}

export default function PostMetadata({ tags = [], date }) {
    return (
        <p className={styles.postMetadata}><time>{formatTs(date)}</time> - <Tags tags={tags} /></p>
    );
}