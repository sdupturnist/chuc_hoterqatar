import Head from "next/head";
import { adminUrl, frontendUrl } from "@/utils/variables";
import { useRouter } from 'next/router';

export default function Metatags({ seo }) {




    const router = useRouter();

    const currentPath = router.asPath;




    return (
        <>
            <Head>
                <>

                    <title>{seo && seo?.metaTitle}</title>


                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />




                    <meta name="description" content={seo && seo?.metaDescription} />
                    <meta name="keywords" content={seo && seo?.keywords} />
                    <link rel="canonical" href={(frontendUrl + currentPath + '/').replace(/([^:]\/)\/+/g, "$1")} />
                    <meta name="robots" content="index, follow" />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={seo && seo?.OGtitle} />
                    <meta property="og:description" content={seo && seo?.OGdescription} />
                    <meta property="og:url" content={(frontendUrl + currentPath + '/').replace(/([^:]\/)\/+/g, "$1")} />
                    <meta property="og:site_name" content={seo && seo?.opengraphSiteName} />
                    <meta property="article:modified_time" content={seo && seo?.OGmodifiedtime} />
                    <meta property="og:image" content={seo ? (adminUrl) + seo?.metaImage?.data?.attributes?.url : ''} />
                    <meta property="og:image:width" content="479" />
                    <meta property="og:image:height" content="482" />
                    <meta property="og:image:type" content="image/webp" />
                    <meta name="twitter:card" content="summary_large_image" />
                </>
            </Head>
        </>
    )
}