require('dotenv').config({
    path: '.env',
});

const siteMetadata = {
    // Used for the title template on pages other than the index site
    siteTitle: `Nuno Cruz`,
    // Default title of the page
    siteTitleAlt: `Nuno's Personal Website`,
    // Can be used for e.g. JSONLD
    siteHeadline: `Nuno's Personal Website`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://nunocruz.pt`,
    // Used for SEO
    siteDescription: `Nuno's Personal Website`,
    // Will be set on the <html /> tag
    siteLanguage: `en`,
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/banner.jpg`,
    // Twitter Handle
    author: `@nunoancruz`,
    // Links displayed in the header on the right side
    siteTitleAlt: 'Nuno\'s Personal Website',
};

module.exports = {
    siteMetadata,
    plugins: [
        {
            resolve: `@lekoarts/gatsby-theme-minimal-blog`,
            // See the theme's README for all available options
            options: {
                navigation: [
                    {
                        title: `Blog`,
                        slug: `/blog`,
                    },
                    {
                        title: `About`,
                        slug: `/about`,
                    },
                ],
                externalLinks: [
                    {
                        name: 'Github',
                        url: 'https://github.com/nancruz'
                    },
                    {
                        name: `Twitter`,
                        url: 'https://twitter.com/nunoancruz',
                    },
                    {
                        name: 'Instagram',
                        url: 'https://www.instagram.com/nuno_acruz/',
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.GOOGLE_ANALYTICS_ID,
            },
        },
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Nuno's Personal Website'`,
                short_name: `Nuno Website`,
                description: `Website where I write about web development.`,
                start_url: `/`,
                background_color: `#fff`,
                theme_color: `#6B46C1`,
                display: `standalone`,
                icons: [
                    {
                        src: `/android-chrome-192x192.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                    },
                    {
                        src: `/android-chrome-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    },
                ],
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-netlify`,
    ],
}
