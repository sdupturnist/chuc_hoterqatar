import { adminUrl, wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import PageHeader from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { AOSInit } from "@/components/Aos";

export default function Career({ pageData_ }) {
  const pageData = pageData_.data.careers.data.attributes;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pageData_) {
      setIsLoading(false);
    }
  }, [pageData_]);

  return (
    <>
      <Metatags seo={pageData_?.data?.careers?.data?.attributes?.seo} />
      <Layout page={'about'}>
        <AOSInit/>
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[60%] xl:w-[60%]">
            {isLoading ? (
          <div className='grid gap-[12px] sm:py-[100px] py-[50px]'>
          <div className="skeleton h-4 w-[80%] rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
              </div>
            ) : (
              <>
                 <div data-aos="fade-up">
                  <PageHeader title={pageData?.Heading} />
                </div>
                <div data-aos="fade-up" data-aos-delay="500" className="grid gap-[30px] sm:pb-[100px] pb-[30px] text-center">
                  <div className="content-general" dangerouslySetInnerHTML={{ __html: pageData?.Content }} />
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const pageData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          careers {
            data {
              attributes {
                Heading
                Content
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
      cache: 'no-store', // Ensure fresh data on each request
    });
    
    const pageData_ = await pageData.json();

    return {
      props: {
        pageData_,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pageData_: null,
      },
    };
  }
}
