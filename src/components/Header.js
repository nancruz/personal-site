import Link from 'next/link';
import styles from './Header.module.css';

const socialLinks = [
    { name: 'Github', link: 'https://github.com/nancruz' },
    { name: 'Twitter', link: 'https://twitter.com/nunoancruz' },
    { name: 'Instagram', link: 'https://www.instagram.com/nuno_acruz/' }
];

const pages = [
    { name: 'Blog', link: '/blog' },
    { name: 'About', link: '/about' }
];

function LinkListItem({ name, link }) {
    return <Link href={link} className={styles.navigationItem}>{name}</Link>;
}

function LinkList({items}) {
    return (
        <div>
            {items.map(({ name, link}) => <LinkListItem key={name} link={link} name={name} />)}
        </div>
    )
}


export default function Header() {
    return (
        (<header className={styles.header}>
            <div>
                <Link href='/' className={styles.logo}><h1>Nuno Cruz</h1></Link>
            </div>
            <div className={styles.navigation}>
                <LinkList key='pages' items={pages} />
                <LinkList key='social' items={socialLinks} />
            </div>
        </header>)
    );
}