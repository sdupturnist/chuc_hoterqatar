import { adminUrl, wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';

import Link from "next/link";
import Images from '@/components/Images';
import { useEffect, useState } from "react";
import { useThemeContext } from "@/context/themeContext";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from "react";
import Header from "@/components/Header";


gsap.registerPlugin(useGSAP, ScrollTrigger);


export default function Home({ homeTwoData_, pageData_ }) {

  const homePageTwoData = homeTwoData_?.data?.home2S?.data ?? [];


  const { setThemeLayout } = useThemeContext()


  const chocolate = useRef();
  const flowers = useRef();
  const cakes = useRef();
  const events = useRef();


  useGSAP(
    () => {

      const imageLeft = gsap.utils.toArray('.section-chocolate .wrpr .chocolate-image-1');
      const imageRight = gsap.utils.toArray('.section-chocolate .wrpr .chocolate-image-2');
      const content = gsap.utils.toArray('.section-chocolate .wrpr .content');



      imageLeft.forEach((box) => {
        gsap.fromTo(box,
          {
            x: 400,
            opacity: 0.3,
            y: 200
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });



      imageRight.forEach((box) => {
        gsap.fromTo(box,
          {
            x: -100,
            opacity: 0.3,
            y: -500
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });

      content.forEach((box) => {
        gsap.fromTo(box,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });


    },
    {
      scope: chocolate
    }
  );



  useGSAP(
    () => {

      const imageLeft = gsap.utils.toArray('.section-flowers .wrpr .chocolate-image-1');
      const content = gsap.utils.toArray('.section-flowers .wrpr .content');
      const content2 = gsap.utils.toArray('.section-flowers .wrpr .content2');



      imageLeft.forEach((box) => {
        gsap.fromTo(box,
          {

            opacity: 0,
            y: -1000,

          },
          {
            opacity: 0.8,
            x: 0,
            y: 0,

            scrollTrigger: {
              trigger: box,
              start: '+=100',
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });

      content.forEach((box) => {
        gsap.fromTo(box,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });



    },
    {
      scope: flowers
    }
  );



  useGSAP(
    () => {

      const imageLeft = gsap.utils.toArray('.section-cakes .wrpr .cakes-image-1');
      const imageRight = gsap.utils.toArray('.section-cakes .wrpr .cakes-image-2');
      const content = gsap.utils.toArray('.section-cakes .wrpr .content');



      imageLeft.forEach((box) => {
        gsap.fromTo(box,
          {
            x: 400,
            opacity: 0.3,
            y: 200
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });



      imageRight.forEach((box) => {
        gsap.fromTo(box,
          {
            x: -100,
            opacity: 0.3,
            y: -500
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });

      content.forEach((box) => {
        gsap.fromTo(box,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });


    },
    {
      scope: cakes
    }
  );

  useGSAP(
    () => {

      const imageLeft = gsap.utils.toArray('.section-events .wrpr .events-image-1');
      const content = gsap.utils.toArray('.section-events .wrpr .content');




      imageLeft.forEach((box) => {
        gsap.fromTo(box,
          {

            filter: 'grayscale(100%)',
            opacity: 0,
            y: -1000,

          },
          {
            filter: 'grayscale(30%)',
            opacity: 0.8,
            x: 0,
            y: 0,

            scrollTrigger: {
              trigger: box,
              start: '+=100',
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });

      content.forEach((box) => {
        gsap.fromTo(box,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: box,
              start: 'top top', // Start when the top of the box hits the top of the viewport
              end: 'bottom top', // End when the bottom of the box hits the top of the viewport
              scrub: true,
              //markers: true,
            },
          }
        );
      });



    },
    {
      scope: events
    }
  );

 // console.log(pageData_)


  return (
    <>
    <Metatags seo={pageData_ && pageData_?.data?.homeTwoPage?.data?.attributes?.seo} />
  <Layout
        page="home2"
        header="color"
      >
        {/* LARGE DEVICES */}
        <div className="hidden xl:block">
          <section
            ref={chocolate}
            className="section-chocolate lg:min-h-screen bg-chocolates-900  items-start grid text-chocolates-100 relative overflow-hidden">
            <Header
              page="home2"
              theme='chocolate'
            />

            <div className="wrpr">



              <Images
                width={190}
                height={290}
                quality={100}
                placeholder={true}
                classes={'chocolate-image-1 max-width-[100%] block absolute top-0 left-[2%]'}
                imageurl={homePageTwoData[0]?.attributes?.Banner1?.data?.attributes?.url ? adminUrl + homePageTwoData[0]?.attributes?.Banner1?.data?.attributes?.url : ''}
                alt={homePageTwoData[0]?.attributes?.Banner1?.data?.attributes?.alternativeText || 'Default title text'}
                title={homePageTwoData[0]?.attributes?.Banner1?.data?.attributes?.alternativeText || 'Default title text'}
              />

              <div className="container relative z-[1] content">
                <div className="mx-auto 2xl:w-[80%] xl:w-[90%] grid gap-[20px]">
                  <div className="w-[100%]">
                    <h1 className="text-[5.5vw] font-primary leading-[1] mt-[-50px] pl-[20%]">
                      <span className="text-[6vw] font-secondary leading-[1.4] ml-[5%] text-end block">
                        {homeTwoData_ && homePageTwoData[0].attributes.Category.AllCategories}
                      </span>
                      <span className="mt-[-50px] block">
                        {homeTwoData_ && homePageTwoData[0].attributes.Heading}
                      </span>
                    </h1>

                    <div className="grid gap-[30px] mt-[50px]">
                      <div className="sm:[&>*]:text-[22px] text-[14px] w-[65%] tracking-[3%] leading-[1.6] uppercase">
                        <p className="">
                          {homeTwoData_ && homePageTwoData[0].attributes.Description[0].children[0].text}
                        </p>
                      </div>
                      <div>
                        <Link
                          aria-label={homeTwoData_ && homePageTwoData[0].attributes.Category.AllCategories} title={homeTwoData_ && homePageTwoData[0].attributes.Category.AllCategories} href={`/${homeTwoData_ && homePageTwoData[0].attributes.Slug}`} onClick={(e) => setThemeLayout(homeTwoData_ && homePageTwoData[0].attributes.Slug)}
                          className="btn btn-lg px-[40px] bg-transparent border border-solid border-chocolates-100 hover:bg-chocolates-100 text-chocolates-100 hover:border-chocolates-100 hover:text-white rounded-full"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Images
                width={388}
                height={489}
                quality={100}
                placeholder={true}
                classes={'chocolate-image-2 max-width-[100%] block absolute bottom-[5%] right-[2%]'}
                imageurl={homePageTwoData[0]?.attributes?.Banner2?.data?.attributes?.url ? adminUrl + homePageTwoData[0]?.attributes?.Banner2?.data?.attributes?.url : ''}
                alt={homePageTwoData[0]?.attributes?.Banner2?.data?.attributes?.alternativeText || 'Default title text'}
                title={homePageTwoData[0]?.attributes?.Banner2?.data?.attributes?.alternativeText || 'Default title text'}
              />




            </div>
          </section>

          <section
            ref={flowers}
            className="section-flowers lg:min-h-screen bg-flowers-900 py-[150px] items-center grid text-flowers-100 text-center relative overflow-hidden">
            <div className="wrpr">
              <div className="container z-[1] relative">
                <div className="mx-auto 2xl:w-[60%] xl:w-[70%] grid gap-[20px]">
                  <div >
                    <div className="content z-20 relative">
                      <h2 className="text-[5.5vw] font-primary leading-[1] mt-[-50px]">
                        <span className="text-[6vw] font-secondary leading-[1.4] ml-[5%]  block">
                          {homeTwoData_ && homePageTwoData[1].attributes.Category.AllCategories}
                        </span>
                        <span className="mt-[-50px] block">
                          {homeTwoData_ && homePageTwoData[1].attributes.Heading}
                        </span>
                      </h2>
                    </div>

                    <Images
                      width={707}
                      height={829}
                      quality={100}
                      placeholder={true}
                      imageurl={homePageTwoData[1]?.attributes?.Banner1?.data?.attributes?.url ? adminUrl + homePageTwoData[1]?.attributes?.Banner1?.data?.attributes?.url : ''}
                      classes={'chocolate-image-1 max-width-[100%] block mx-auto  bottom-[5%] right-0 left-0 z-[-1]'}
                      alt={homePageTwoData[1]?.attributes?.Banner1?.data?.attributes?.alternativeText || 'Default title text'}
                      title={homePageTwoData[1]?.attributes?.Banner1?.data?.attributes?.alternativeText || 'Default title text'}
                    />


                    <div className="content2">
                      <div className="grid gap-[30px] mt-[50px]">
                        <div className="sm:[&>*]:text-[22px] text-[14px] tracking-[3%] leading-[1.6] uppercase">
                          <p className="">
                            {homeTwoData_ && homePageTwoData[1].attributes.Description[0].children[0].text}
                          </p>
                        </div>
                        <div>
                          <Link
                            aria-label={homeTwoData_ && homePageTwoData[1].attributes.Category.AllCategories} title={homeTwoData_ && homePageTwoData[1].attributes.Category.AllCategories} href={`/${homeTwoData_ && homePageTwoData[1].attributes.Slug}`} onClick={(e) => setThemeLayout(homeTwoData_ && homePageTwoData[1].attributes.Slug)}
                            className="btn btn-lg px-[40px] bg-transparent border border-solid border-flowers-100 hover:bg-flowers-100 text-flowers-100 hover:border-flowers-100 hover:text-white rounded-full"
                          >
                            Shop Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            ref={cakes}
            className="section-cakes lg:min-h-screen bg-cakes-900  items-center grid text-cakes-100 text-center relative overflow-hidden">




            <div className="wrpr">




              <Images
                width={190}
                height={290}
                quality={100}
                placeholder={true}
                classes={'cakes-image-1 max-width-[100%] block absolute top-0 left-[2%]'}
                imageurl={homePageTwoData[2]?.attributes?.Banner1?.data?.attributes?.url ? adminUrl + homePageTwoData[2]?.attributes?.Banner1?.data?.attributes?.url : ''}
                alt={homePageTwoData[2]?.attributes?.Banner1?.data?.attributes?.alternativeText || 'Default title text'}
                title={homePageTwoData[2]?.attributes?.Banner1?.data?.attributes?.alternativeText || 'Default title text'}
              />




              <div className="container relative z-[1] content">
                <div className="mx-auto 2xl:w-[60%] xl:w-[70%] grid gap-[20px]">
                  <div className="w-[100%]">

                    <h2 className="text-[5.5vw] font-primary leading-[1] mt-[-50px]">
                      <span className="text-[6vw] font-secondary leading-[1.4] ml-[5%]  block">
                        {homeTwoData_ && homePageTwoData[2].attributes.Category.AllCategories}
                      </span>
                      <span className="mt-[-50px] block">
                        {homeTwoData_ && homePageTwoData[2].attributes.Heading}
                      </span>
                    </h2>
                    <div className="grid gap-[30px] mt-[50px]">
                      <div className="sm:[&>*]:text-[22px] text-[14px] tracking-[3%] leading-[1.6] uppercase">
                        <p className="">
                          {homeTwoData_ && homePageTwoData[2].attributes.Description[0].children[0].text}
                        </p>
                      </div>
                      <div>
                        <Link
                          aria-label={homeTwoData_ && homePageTwoData[2].attributes.Category.AllCategories} title={homeTwoData_ && homePageTwoData[2].attributes.Category.AllCategories} href={`/${homeTwoData_ && homePageTwoData[2].attributes.Slug}`} onClick={(e) => setThemeLayout(homeTwoData_ && homePageTwoData[2].attributes.Slug)}
                          className="btn btn-lg px-[40px] bg-transparent border border-solid border-cakes-100 hover:bg-cakes-100 text-cakes-100 hover:border-cakes-100 hover:text-white rounded-full"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>


              <Images
                width={388}
                height={489}
                quality={100}
                placeholder={true}
                classes={'cakes-image-2 max-width-[100%] block absolute bottom-[5%] right-[2%]'}
                imageurl={homePageTwoData[2]?.attributes?.Banner2?.data?.attributes?.url ? adminUrl + homePageTwoData[2]?.attributes?.Banner2?.data?.attributes?.url : ''}
                alt={homePageTwoData[2]?.attributes?.Banner2?.data?.attributes?.alternativeText || 'Default title text'}
                title={homePageTwoData[2]?.attributes?.Banner2?.data?.attributes?.alternativeText || 'Default title text'}
              />

            </div>


          </section>


          <section
            ref={events}
            className="section-events lg:min-h-screen bg-events-900 py-[150px] items-center grid text-events-100 text-center relative overflow-hidden">
            <div className="wrpr">
              <div className="container z-[1] relative">
                <div className="mx-auto 2xl:w-[60%] xl:w-[70%] grid gap-[20px]">
                  <div >

                    <div className="content z-20 relative">
                      <h2 className="text-[5.5vw] font-primary leading-[1] mt-[-50px]">
                        <span className="text-[6vw] font-secondary leading-[1.4] ml-[5%]  block">
                          {homeTwoData_ && homePageTwoData[3].attributes.Category.AllCategories}
                        </span>
                        <span className="mt-[-50px] block">
                          {homeTwoData_ && homePageTwoData[3].attributes.Heading}
                        </span>
                      </h2>
                    </div>
                    {/*  */}
                    <div className="overflow-hidden events-image-1 mx-auto h-[70vh] w-[50%]">

                      <video
                        className="mx-auto"
                        src={homePageTwoData[3]?.attributes?.Banner1?.data?.attributes?.url ? adminUrl + homePageTwoData[3]?.attributes?.Banner1?.data?.attributes?.url : ''}
                        muted
                        autoPlay={"autoplay"}
                        loop
                      >
                        video tag is not supported by your browser
                      </video>


                    </div>
                    <div className="content2">
                      <div className="grid gap-[30px] mt-[50px]">
                        <div className="sm:[&>*]:text-[22px] text-[14px] tracking-[3%] leading-[1.6] uppercase">
                          <p className="">
                            {homeTwoData_ && homePageTwoData[3].attributes.Description[0].children[0].text}
                          </p>
                        </div>
                        <div>
                          <Link
                            aria-label={homeTwoData_ && homePageTwoData[3].attributes.Category.AllCategories} title={homeTwoData_ && homePageTwoData[3].attributes.Category.AllCategories} href={`/${homeTwoData_ && homePageTwoData[3].attributes.Slug}`} onClick={(e) => setThemeLayout(homeTwoData_ && homePageTwoData[3].attributes.Slug)}
                            className="btn btn-lg px-[40px] bg-transparent border border-solid border-events-100 hover:bg-events-100 text-events-100 hover:border-events-100 hover:text-white rounded-full"
                          >
                            Shop Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
  homeTwoPage{
     data{
      attributes{
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




    //HOME2DATA
    const homeTwoData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query{
 home2S{
  data{
    attributes{
      Category{
        ProductMainCategory
      }
      Heading
      Description
      Slug
      Banner1{
        data{
          attributes{
            alternativeText
            width
            height
          url
          }
        }
      }
      Banner2{
            data{
          attributes{
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
`,
        variables: { page, pageSize },
      }),
    });
    const homeTwoData_ = await homeTwoData.json();

    return {
      props: {
        pageData_,
        homeTwoData_
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pageData_: null,
        homeTwoData_: null,
      },
    };
  }
}
