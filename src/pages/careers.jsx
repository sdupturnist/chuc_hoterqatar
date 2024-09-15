import { adminUrl, wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import PageHeader from "@/components/PageHeader";
import { useEffect, useState } from "react";

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
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[60%] xl:w-[60%]">
            {isLoading ? (
              <div className='grid gap-[12px]'>
                <div className="skeleton h-32 w-full sm:min-h-[100px] rounded-[10px]"></div>
                <div className="skeleton h-4 w-[80%] rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
              </div>
            ) : (
              <>
                <PageHeader title={pageData?.Heading} />
                <div className="grid gap-[30px] sm:pb-[100px] pb-[30px] text-center">
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

export async function getStaticProps() {
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
    });
    const pageData_ = await pageData.json();

    return {
      props: {
        pageData_
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pageData_: null,
      },
      revalidate: 3600, // Revalidate every hour in case of error
    };
  }
}
