import { useRouter } from 'next/router';
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Card from '@/components/Cards';
import Pagination from '@/components/Pagination';
import NoData from '@/components/Nodata';
import { useEffect, useState } from 'react';
import { useThemeContext } from '@/context/themeContext';
import Metatags from '@/components/Seo';

export default function AllProducts({ productData_, pageData_, pageDataMainCatSeo_}) {
  const allProducts = productData_?.data?.shops?.data ?? [];
  const pagination = productData_?.data?.shops?.meta?.pagination ?? {};
  const { themeLayout } = useThemeContext();
  const router = useRouter();
  const { query } = router;
  const [currentUrl, setCurrentUrl] = useState('');


  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(`${window.location.origin}${router.asPath}`);
    }
  }, [router.asPath]);

  return (
    <>
      {pageData_?.data?.subCategorie?.data[0]?.attributes?.seo && (
        <Metatags seo={pageData_?.data?.subCategorie?.data[0]?.attributes?.seo} />
      )}
      {!pageData_?.data?.subCategorie?.data[0]?.attributes?.seo && (
        <Metatags seo={pageDataMainCatSeo_?.data?.mainCategories?.data[0]?.attributes?.seo} />
      )}

      <Layout page="category">
        <div className="container [&>*]:text-black grid xl:gap-[50px] gap-[30px] lg:pt-[30px] xl:pb-[70px] pb-[20px] overflow-hidden">
          <PageHeader
            type="cat"
            catcount={5}
            title={query.category.replace(/-/g, ' ')}
            data={productData_}
          />

          {productData_?.data?.shops?.data.length > 0 ? (
            <>
              <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[40px] gap-[20px]">
                {allProducts.map((item, key) => {
                  const publicReviews = item?.attributes?.reviews?.filter(review => review.showPublic);

                  return (
                    <div className="w-full" key={key}>
                      <Card
                        type="cat"
                        item={item}
                        review={publicReviews ? publicReviews.length : null}
                        theme={themeLayout}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="text-center pb-[100px] lg:pb-[0]">
                <Pagination
                  currentPage={pagination.page}
                  pageCount={pagination.pageCount}
                  pageLink={currentUrl}
                />
              </div>
            </>
          ) : (
            <NoData title={`Sorry, no any ${query.category} available.`} />
          )}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params, query } = context;
  const categorySlug = params.category?.replace(/-/g, '_')?.toLowerCase();
  const categorySlugFallback = params.category?.replace(/-/g, '-')?.toLowerCase();
  const page = parseInt(query.page) || 1; // Default to page 1 for static props
  const pageSize = 12; // Set your desired page size
  const minPrice = 0;
  const maxPrice = 100000;
  const minReviewRating = 0;

  try {
    // Fetch data for the provided subcategory
    const productDataResponse = await fetch(wordpressGraphQlApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query ($page: Int, $pageSize: Int, $categorySlug: String, $minPrice: Float, $maxPrice: Float, ${minReviewRating > 0 ? '$minReviewRating: Int' : ''}) {
            shops(
              pagination: { page: $page, pageSize: $pageSize }
              filters: {
                sub_categories: { slug: { eq: $categorySlug } }
                normalPrice: { gte: $minPrice, lte: $maxPrice }
                ${minReviewRating > 0 ? 'reviews: { rating: { gte: $minReviewRating } }' : ''}
              }
            ) {
              data {
                id
                attributes {
                  Featured
                  Slug
                  Heading
                  photo {
                    data {
                      attributes {
                        alternativeText
                        width
                        height
                        url
                      }
                    }
                  }
                  Unit
                  reviews {
                    id
                    rating
                    author
                    comment
                    postedDate
                    authorEmail
                    showPublic
                  }
                  Description
                  normalPrice
                  offerPrice
                  productCode
                  sub_categories {
                    data {
                      attributes {
                        slug
                      }
                    }
                  }
                  Includes
                  ShortDescription
                  main_categories {
                    data {
                      attributes {
                        Slug
                      }
                    }
                  }
                  createdAt
                  updatedAt
                  publishedAt
                  seo {
                    metaTitle
                    metaDescription
                    metaImage {
                      data {
                        attributes {
                          alternativeText
                          url
                        }
                      }
                    }
                    metaSocial {
                      image {
                        data {
                          attributes {
                            url
                          }
                        }
                      }
                      description
                      title
                    }
                    keywords
                    metaRobots
                    metaViewport
                    canonicalURL
                    OGSitename
                    OGmodifiedtime
                    OGdescription
                  }
                }
              }
              meta {
                pagination {
                  page
                  pageSize
                  pageCount
                  total
                }
              }
            }
          }
        `,
        variables: { page, pageSize, categorySlug: categorySlugFallback, minPrice, maxPrice, minReviewRating },
      }),
    });
    const productData_ = await productDataResponse.json();

    // Check if the desired subcategory has any results
    const hasDesiredCategory = productData_.data.shops.data.length > 0;

    let finalProductData = productData_;

    if (!hasDesiredCategory) {
      // Fetch fallback data based on main category
      const fallbackProductDataResponse = await fetch(wordpressGraphQlApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query ($page: Int, $pageSize: Int, $categorySlug: String, $minPrice: Float, $maxPrice: Float, ${minReviewRating > 0 ? '$minReviewRating: Int' : ''}) {
              shops(
                pagination: { page: $page, pageSize: $pageSize }
                filters: {
                  main_categories: { Slug: { contains: $categorySlug } }
                  normalPrice: { gte: $minPrice, lte: $maxPrice }
                  ${minReviewRating > 0 ? 'reviews: { rating: { gte: $minReviewRating } }' : ''}
                }
              ) {
                data {
                  id
                  attributes {
                    Featured
                    Slug
                    Heading
                    photo {
                      data {
                        attributes {
                          alternativeText
                          width
                          height
                          url
                        }
                      }
                    }
                    Unit
                    reviews {
                      id
                      rating
                      author
                      comment
                      postedDate
                      authorEmail
                      showPublic
                    }
                    Description
                    normalPrice
                    offerPrice
                    productCode
                    sub_categories {
                      data {
                        attributes {
                          slug
                        }
                      }
                    }
                    Includes
                    ShortDescription
                    main_categories {
                      data {
                        attributes {
                          Slug
                        }
                      }
                    }
                    createdAt
                    updatedAt
                    publishedAt
                    seo {
                      metaTitle
                      metaDescription
                      metaImage {
                        data {
                          attributes {
                            alternativeText
                            url
                          }
                        }
                      }
                      metaSocial {
                        image {
                          data {
                            attributes {
                              url
                            }
                          }
                        }
                        description
                        title
                      }
                      keywords
                      metaRobots
                      metaViewport
                      canonicalURL
                      OGSitename
                      OGmodifiedtime
                      OGdescription
                    }
                  }
                }
                meta {
                  pagination {
                    page
                    pageSize
                    pageCount
                    total
                  }
                }
              }
            }
          `,
          variables: { page, pageSize, categorySlug: categorySlug, minPrice, maxPrice, minReviewRating },
        }),
      });
      finalProductData = await fallbackProductDataResponse.json();
    }

    // Fetch additional page data
    const pageData = await fetch(wordpressGraphQlApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query ($categorySlug: String) {
            subCategorie(
              pagination: { limit: 1000 }
              filters: { slug: { contains: $categorySlug } }
            ) {
              data {
                attributes {
                  seo {
                    metaTitle
                    metaDescription
                    metaImage {
                      data {
                        attributes {
                          alternativeText
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { categorySlug: categorySlugFallback },
      }),
    });
    const pageData_ = await pageData.json();

    // Fetch SEO data for the main category
    const mainCategorySeoResponse = await fetch(wordpressGraphQlApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query ($categorySlug: String) {
            mainCategories(
              pagination: { limit: 1000 }
              filters: { slug: { contains: $categorySlug } }
            ) {
              data {
                attributes {
                  seo {
                    metaTitle
                    metaDescription
                    metaImage {
                      data {
                        attributes {
                          alternativeText
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { categorySlug: categorySlugFallback },
      }),
    });
    const pageDataMainCatSeo_ = await mainCategorySeoResponse.json();

 
    return {
      props: {
        productData_: finalProductData,
        pageData_,
        pageDataMainCatSeo_,
       
        
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true, // Return 404 if there's an error
    };
  }
}
