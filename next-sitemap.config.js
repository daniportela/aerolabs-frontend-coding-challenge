/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://aerolabs-frontend-coding-challenge.vercel.app/',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/"
            }
        ]
    }
}