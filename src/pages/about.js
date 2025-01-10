import Link from "next/link";
import Layout from "../components/Layout";

export default function About() {
    return (
        <Layout pageTitle="About | Nuno Cruz">
            <h1>About</h1>
            <p>
                I’m an engineering manager at Sky, where I help build apps like
                Peacock, SkyShowtime, and Showmax. I currently lead one of the
                teams responsible for the TV devices, working on bringing the
                magic of entertainment to your screen.
            </p>
            <p>
                Before stepping into management, I spent seven years as a
                frontend engineer, with five of those years at Feedzai. There, I
                worked on creating fraud prevention tools that helped
                investigators and analysts uncover complex financial crime
                patterns—basically, making bad guys' lives a little harder.
            </p>
            <p>
                When I’m not working, you can usually find me with a book in
                hand, breaking a sweat at the gym, exploring new cuisines, or
                planning my next adventure.
            </p>
        </Layout>
    );
}
