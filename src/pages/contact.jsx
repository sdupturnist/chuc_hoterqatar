import { wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/Forms/ContactUs";
import { ContactData } from "@/hooks/contactData";
import { useEffect, useState } from "react";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { AOSInit } from "@/components/Aos";

export default function Contact({ initialData, pageData_ }) {

  const pageData = pageData_.data.contact.data.attributes;

  const { dataContact } = ContactData(initialData);
  const contactData = dataContact && dataContact.data.contactInfos.data[0].attributes;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (dataContact) {
      setIsLoading(false);
    }
  }, [dataContact]);

  return (
    <>
      <Metatags seo={pageData_ && pageData_?.data?.contact?.data?.attributes?.seo} />
      <Layout page="contact">
        <AOSInit/>
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%]">
            <PageHeader title={pageData_ && pageData.Title} />

            <div className="md:flex grid [&>*]:text-gray-600 lg:mb-[70px] sm:py-[50px] pb-[30px] justify-between lg:gap-[100px] gap-[50px]">
              <div className="grid gap-[32px] w-full" data-aos="fade-up">
                <div className="grid gap-[32px] w-full">
                  {isLoading ? (
                    <div>
                      <div className="skeleton h-4 w-[50%] rounded-[10px] mb-5"></div>
                      <div className="skeleton h-4 w-full rounded-[10px] mb-5"></div>
                      <div className="skeleton h-4 w-full rounded-[10px]"></div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="font-semibold text-[16px] uppercase tracking-[1%] mb-[12px] text-black">
                        Office
                      </h2>
                      <p className="mb-[8px]">
                        <BlocksRenderer content={contactData && contactData.Address} />
                      </p>
                      <p className="mb-[8px]">
                        {contactData.Phone}
                      </p>
                      <p>
                        {contactData.Email}
                      </p>
                    </div>
                  )}

                  <div>
                    <h2 className="font-semibold text-[16px] uppercase tracking-[1%] mb-[12px] text-black">
                      Business Inquiries
                    </h2>
                    <p>
                      {pageData_ && pageData.Content}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full block" data-aos="fade-up" data-aos-delay="500">
              <ContactForm />
              </div>
             </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const pageDataResponse = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          contact {
            data {
              attributes {
                Title
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
      cache: 'no-store', // Fetch fresh data on each request
    });
    
    const pageData_ = await pageDataResponse.json();

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
