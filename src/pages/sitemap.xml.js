import { frontendUrl, adminUrl } from "@/utils/variables";

// Define the external API URLs
const EXTERNAL_DATA_URL_POSTS = `${adminUrl}/api/posts`;
const EXTERNAL_DATA_URL_PRODUCTS = `${adminUrl}/api/shops?populate=*`; // Correct URL for products

// Function to generate the sitemap XML
function generateSiteMap(posts = [], products = []) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${frontendUrl}</loc>
     </url>
     <url>
       <loc>${frontendUrl}about/</loc>
     </url>
     <url>
       <loc>${frontendUrl}blogs/</loc>
     </url>
     <url>
       <loc>${frontendUrl}contact/</loc>
     </url>
     ${posts
       .map(({ attributes }) => {
         const slug = attributes?.Slug || '';
         return `
       <url>
         <loc>${`${frontendUrl}blogs/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}
     ${products
       .map(({ attributes }) => {
         const productSlug = attributes?.Slug || '';
         const subCategoryData = attributes?.sub_categories?.data || [];
         const mainCategoryData = attributes?.main_categories?.data || [];
         
         // Extract slugs
         const mainCategorySlug = mainCategoryData.length > 0
           ? mainCategoryData[0]?.attributes?.Slug || 'default-maincategory'
           : 'default-maincategory';
           
         const subCategorySlug = subCategoryData.length > 0
           ? subCategoryData[0]?.attributes?.Slug || 'default-subcategory'
           : 'default-subcategory';

         console.log(`Product: ${productSlug}, MainCategory: ${mainCategorySlug}, SubCategory: ${subCategorySlug}`); // Debug output

         return `
       <url>
         <loc>${`${frontendUrl}${mainCategorySlug}/${productSlug}/`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  try {
    // Fetch data for posts
    const postsResponse = await fetch(EXTERNAL_DATA_URL_POSTS);
    const postsData = await postsResponse.json();
    const posts = postsData?.data || []; // Default to empty array if data is null or undefined

    // Fetch data for products
    const productsResponse = await fetch(EXTERNAL_DATA_URL_PRODUCTS);
    const productsData = await productsResponse.json();
    const products = productsData?.data || []; // Default to empty array if data is null or undefined

    // Log data for debugging purposes
    console.log('Posts:', posts);
    console.log('Products:', products);

    // Generate the XML sitemap with the posts and products data
    const sitemap = generateSiteMap(posts, products);

    res.setHeader('Content-Type', 'text/xml');
    // Send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
    return {
      props: {},
    };
  }
}

export default SiteMap;
