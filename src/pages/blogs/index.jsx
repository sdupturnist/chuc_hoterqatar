import { wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import Card from "@/components/Cards";
import NoData from "@/components/Nodata";


export default function Blogs({ pageData_, blogData_ }) {



  const pageData = pageData_?.data?.blogPage?.data?.attributes
  const blogs = blogData_?.data?.posts?.data ?? [];
  const pagination = blogData_?.data?.posts?.meta?.pagination ?? {};


  return (
    <>
      <Metatags seo={pageData_ && pageData_?.data?.blogPage?.data?.attributes?.seo} />
      <Layout
        page="blog"
      >
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%]">
            <PageHeader
              title={pageData_ && pageData?.Heading}
            />
            <div className="sm:pb-[50px] pb-[30px] justify-between lg:gap-[100px] gap-[50px]">
              {!blogs.length == 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-[50px] gap-[30px]" >
                    {blogs && blogs.map((item, key) => {
                      return (
                        <div className="w-full grid gap-[20px]" key={key}>
                          <Card
                            type="blog"
                            item={item}

                          />
                        </div>
                      )
                    })}
                  </div>
                  <div className="text-center">
                    <Pagination
                      currentPage={pagination.page}
                      pageCount={pagination.pageCount}
                    />
                  </div>
                </>
              ) : (
                <NoData title="Sorry, no blog posts available." />
              )}


            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}



export async function getServerSideProps(context) {
  const page = parseInt(context.query.page) || 1; // Default to page 1 if not provided
  const pageSize = 4; // Set your desired page size

  try {
    const pageData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          blogPage {
            data {
              attributes {
                Heading
                seo{
          metaTitle
          metaDescription
          metaImage{
            data{
              attributes{
                url
              }
            }
          }
          metaSocial{
            title
            description
            socialNetwork
          }
          keywords
          metaRobots
          structuredData
          canonicalURL
          OGtitle
          OGSitename
          OGdescription
          OGmodifiedtime
        }
              }
              
            }
          }
        }

`,
      }),
    });
    const pageData_ = await pageData.json();

    const blogData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query($page: Int, $pageSize: Int) {
          posts(pagination: { page: $page, pageSize: $pageSize }) {
            data {
             id
              attributes {
                Banner {
                  data {
                    attributes {
                      alternativeText
                      width
                      height
                      url
                    }
                  }
                }
                Title
                Author
                Slug
                PostDate
                Content
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
        }`,
        variables: { page, pageSize },
      }),
    });
    const blogData_ = await blogData.json();

    return {
      props: {
        pageData_,
        blogData_,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pageData_: null,
        blogData_: null,
      },
    };
  }
}
