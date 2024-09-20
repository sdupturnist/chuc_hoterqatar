import Layout from "@/components/Layout";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql, useLazyQuery } from '@apollo/client';
import client from '@/lib/apolloClient';
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Cards";
import NoData from "@/components/Nodata";
import Metatags from "@/components/Seo";
import { wordpressGraphQlApiUrl } from "@/utils/variables";


// GraphQL query for search
const SEARCH_PAGES = gql`
  query($searchTerm: String) {
    shops(
      filters: {
        ShortDescription: { contains: $searchTerm }
      }
      pagination: { limit: 100 }
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
          Description
          normalPrice
          offerPrice
          productCode
          Includes
          ShortDescription
          main_categories {
            data {
              attributes {
                Title
                Slug
              }
            }
          }
          sub_categories {
            data {
              attributes {
                slug
                Title
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
        }
      }
    }
  }
`;

export default function Search({ pageData_, reviewCountData_ }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPages, { loading, data }] = useLazyQuery(SEARCH_PAGES, {
    client,
    variables: { searchTerm }
  });

  useEffect(() => {
    const { query } = router.query;
    if (query) {
      const decodedQuery = decodeURIComponent(query.replace(/\+/g, ' '));
      setSearchTerm(decodedQuery);
      searchPages({ variables: { searchTerm: decodedQuery } });
    }
  }, [router.query]);

  return (
    <>
      <Metatags seo={pageData_ && pageData_?.data?.search?.data?.attributes?.seo} />
      <Layout page="search">
        <div className="container [&>*]:text-black grid xl:gap-[50px] gap-[5px] lg:pt-[30px] xl:pb-[70px] pb-[20px]">
          <PageHeader title={`Search ${searchTerm}`} />

          {loading && <Loading />}

          {!loading && data?.shops?.data.length === 0 && (
            <NoData title={"Sorry, no products were found. Please try searching with different keywords."} />
          )}

          {data?.shops?.data.length > 0 && (
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[40px] gap-[20px]">
              {data.shops.data.map((item, key) => {
                const publicReviews = item?.attributes?.reviews?.filter(review => review.showPublic);
                return (
                  <div className="w-full" key={key}>
                    <Card
                      type="cat"
                      item={item}
                      review={publicReviews ? publicReviews.length : null}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  try {
    // Fetch the data for the page
    const pageDataResponse = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          search {
            data {
              attributes {
                Heading
                seo {
                  metaTitle
                  metaDescription
                  metaImage {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  metaSocial {
                    title
                    description
                    socialNetwork
                  }
                  keywords
                  metaRobots
                  canonicalURL
                  OGtitle
                  OGSitename
                  OGdescription
                  OGmodifiedtime
                }
              }
            }
          }
        }`,
      }),
    });
    const pageData_ = await pageDataResponse.json();

    // Fetch review count data
    const reviewCountResponse = await fetch(wordpressGraphQlApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          review(pagination: { limit: 6 }) {
            data {
              attributes {
                productId
              }
            }
          }
        }`,
      }),
    });
    const reviewCountData_ = await reviewCountResponse.json();

    return {
      props: {
        pageData_,
        reviewCountData_,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pageData_: null,
        reviewCountData_: null,
      },
      revalidate: 60, // Optional: still allow revalidation even on error
    };
  }
}
