import { adminUrl, wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Images from '@/components/Images';
import Link from "next/link";
import Card from "@/components/Cards";
import { useEffect, useMemo, useState } from "react";
import Metatags from "@/components/Seo";
import { useRouter } from "next/router";



export default function BlogSingle({ singleBLogsData_, blogData_ }) {


  const router = useRouter();



  const singleBLogsData = singleBLogsData_?.data?.posts?.data[0]?.attributes
  const blogs = useMemo(() => blogData_?.data?.posts?.data ?? [], [blogData_]);


  const banner = singleBLogsData?.Banner?.data?.attributes

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (singleBLogsData_?.data?.posts?.data?.length == 0) {
      router.push('/404'); // Redirect to 404 page
    }
    if (blogs) {
      setIsLoading(false);
    }
  }, [blogs, singleBLogsData_, router]);

  if (singleBLogsData_?.data?.posts?.data?.length == 0) {
    return null; // Render nothing while redirecting
  }




  function formatBlogDate(date_) {

    const originalDate = new Date(date_);
    const formattedDate = originalDate.toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });

    return formattedDate

  }







  return (
  
    singleBLogsData_ &&
     <>
      <Metatags seo={singleBLogsData_ && singleBLogsData_?.data?.posts?.data[0]?.attributes?.seo} />
      <Layout
        page="blog-single"
      >

        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[60%] xl:w-[70%] grid sm:gap-[50px] gap-[30px] xl:py-[70px] lg:py-[50px] py-[30px]">


            {isLoading ? (
              <div className="grid gap-[20px]">
                <div className="skeleton h-32 w-full sm:min-h-[450px]"></div>
                <div className="skeleton h-4 w-[80%]"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-[30%]"></div>
              </div>
            ) : (
              <div className="grid sm:gap-[30px] gap-[20px]">
                <h1 className="sm:text-[36px] text-[22px] font-semibold">{singleBLogsData && singleBLogsData.Title}</h1>
                <Images
                  width={singleBLogsData?.Banner?.data && banner?.width}
                  height={singleBLogsData?.Banner?.data && banner?.width}
                  quality={100}
                  placeholder={true}
                  imageurl={singleBLogsData?.Banner?.data && adminUrl + banner?.url}
                  classes={'mx-auto w-full block rounded-[8px] object-cover sm:min-h-[450px]'}
                  alt={singleBLogsData?.Banner?.data && banner?.alternativeText}
                  title={singleBLogsData?.Banner?.data && banner?.alternativeText}
                />
                <div className="grid gap-[15px]">
                  <div className="content grid gap-[16px]">
                    <div dangerouslySetInnerHTML={{
                      __html:
                        singleBLogsData &&
                        singleBLogsData.Content &&
                        singleBLogsData.Content[0] &&
                        singleBLogsData.Content[0].children &&
                        singleBLogsData.Content[0].children[0] &&
                        singleBLogsData.Content[0].children[0].text || ''
                    }} />
                  </div>
                  <p className="mt-[16px]">{singleBLogsData && singleBLogsData.Author} <span className="text-[10px] text-gray-300 px-[6px]">|</span> {singleBLogsData && formatBlogDate(singleBLogsData.PostDate)}</p>
                </div>
              </div>
            )}


            {blogs.length !== 0 && <div className="sm:py-[50px] py-[30px] justify-between gap-[40px] border-t border-gray-200 border-solid">
              <div className="flex justify-between items-center">
                <h2 className="uppercase font-semibold text-black sm:text-[24px] text-[18px]">More blogs</h2>
                {blogs.length > 1 && <Link href={'/blogs'} className="btn btn-outline border border-gray-300 rounded-[6px] px-[20px] hidden sm:flex">view more</Link>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-[50px] gap-[30px] mt-[30px]" >
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
              {blogs.length > 1 && <Link href={'/blogs'} className="btn btn-outline border border-gray-300 rounded-[6px] px-[20px] flex sm:hidden mt-[30px]">view more</Link>}
            </div>}
          </div>
        </div>
      </Layout>
     </>
   
  );
}



export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  try {
    // Fetch current blog data
    const blogSingleData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
  posts(filters: { Slug: { eq: "${slug}" } }) {
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

    const singleBLogsData_ = await blogSingleData.json();
    const currentPostId = singleBLogsData_.data.posts.data[0]?.id;

    // Fetch other blog data excluding the current post
    const blogData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
  posts(filters: { id: { ne: ${currentPostId} } }, pagination: { limit: 4 }) {
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
    const blogData_ = await blogData.json();

    return {
      props: {
        singleBLogsData_,
        blogData_,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        singleBLogsData_: null,
        blogData_: null,
      },
    };
  }
}
