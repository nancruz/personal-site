import Link from 'next/link';
import Layout from '../components/Layout';

export default function About() {
    return (
        <Layout pageTitle="About | Nuno Cruz">
            <h1>About</h1>
            <p>I'm Nuno and I'm a Frontend Engineer working at <a href='https://www.sky.com' target='_blank' rel='noopener'>Sky</a>.</p>
            <p>With more than 5+ years of experience building products with JavaScript, I'm currently helping my team building <a href='https://www.peacocktv.com' target='_blank' rel='noopener'>Peacock</a> 🦚 - the best streaming platform.</p>
            <p>Previously, I spent 4 years at <a href='https://feedzai.com' target='_blank' rel='noopener'>Feezai</a> helping building fraud prevention tools to help fraud investigators and analysts to find and visualize complex financial crime patterns tools using technologies like React, D3.js or canvas.</p>
            <p>When not building stuff, I'm probably at the gym 🏋️‍♂️, running 🏃‍♂, reading 📖 or taking photos 📸.</p>
            <p>For more information about my professional experience, please check my <Link href='/resume.pdf'>resume</Link>.</p>
        </Layout>
    );
}