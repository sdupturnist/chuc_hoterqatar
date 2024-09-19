import { adminUrl, wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Images from '@/components/Images';
import PageHeader from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { AOSInit } from '@/components/Aos';

export default function About({ pageData_ }) {
  const pageData = pageData_.data.about.data.attributes;
  const aboutData = pageData.Banner.data[0].attributes;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (pageData_) {
      setIsLoading(false);
    }
  }, [pageData_]);

  return (
    <>
      <Metatags seo={pageData_?.data?.about?.data?.attributes?.seo} />
      <Layout page={'about'}>
        <AOSInit />
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%] ">
            {isLoading ? (
              <div className='grid gap-[12px] sm:py-[100px] py-[50px]'>
                <div className="skeleton h-32 w-full sm:min-h-[100px] rounded-[10px]"></div>
                <div className="skeleton h-4 w-[80%] rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
                <div className="skeleton h-4 w-full rounded-[10px]"></div>
              </div>
            ) : (
              <>
                <div data-aos="fade-up">
                  <PageHeader title={pageData?.Heading} />
                </div>
                <div>
                  <div data-aos="fade-up" data-aos-delay="500">
                    <Images
                      width={aboutData?.width}
                      height={aboutData?.height}
                      quality={100}
                      placeholder={true}
                      imageurl={adminUrl + aboutData?.url}
                      classes={'mx-auto w-full block rounded-[10px]'}
                      alt={aboutData?.alternativeText}
                      title={aboutData?.alternativeText}

                    />
                  </div>
                  <div className="grid gap-[30px] md:pt-[60px] sm:pt-[30px] pt-[20px] sm:pb-[100px] pb-[30px] justify-end" data-aos="fade-up" data-aos-delay="700">
                    <BlocksRenderer content={pageData?.Content} />
                  </div>
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
          about {
            data {
              attributes {
                Banner {
                  data {
                    attributes {
                      url
                      alternativeText
                      width
                      height
                    }
                  }
                }
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
      cache: 'no-store',
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
