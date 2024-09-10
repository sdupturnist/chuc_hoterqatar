import { frontendUrl, wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import Link from "next/link";
import Slider from "react-slick";
import Card from "@/components/Cards";
import Images from '@/components/Images';
import { useThemeContext } from "@/context/themeContext";
import Header from "@/components/Header";
import { useCallback, useEffect, useRef, useState } from "react";


export default function Home({ heroSlideData_, pageData_, homeTwoData_, featuredProducts_ }) {

  const sliderBanner = heroSlideData_?.data?.homeSlideBanners?.data ?? [];
  const homePageData = pageData_?.data?.home?.data?.attributes ?? [];
  const homePageTwoData = homeTwoData_?.data?.home2S?.data ?? [];
  const productsFeatured = featuredProducts_?.data?.shops?.data ?? [];
  // const reviews = reviewCountData_?.data?.review?.data
  const homePageData_0 = homePageTwoData[0].attributes
  const homePageData_1 = homePageTwoData[1].attributes
  const homePageData_2 = homePageTwoData[2].attributes
  const homePageData_3 = homePageTwoData[3].attributes





  const { setThemeLayout } = useThemeContext()


  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    // Example: Add custom logic to manage aria-hidden
    if (slider) {
      const updateAriaHidden = () => {
        const slides = slider.querySelectorAll('.slick-slide');
        slides.forEach((slide) => {
          const isVisible = slide.classList.contains('slick-active');
          slide.setAttribute('aria-hidden', !isVisible);
        });
      };

      slider.addEventListener('afterChange', updateAriaHidden);
      return () => {
        slider.removeEventListener('afterChange', updateAriaHidden);
      };
    }
  }, []);


  // const heroSlider = {
  //   dots: true,
  //   fade: true,
  //   infinite: true,
  //   speed: 3500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   waitForAnimate: false,
  //   autoplay: true,
  //   pauseOnHover: false,
  // };

  const featuredProductsSlider = {
    dots: false,
    // fade: true,
    infinite: true,
    autoplay: true,
    loop: true,
    lazyLoad: true,
    speed: 3000,
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: false,
  };



  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderBanner?.length ?? 4);
  }, []);

  // Set up interval for autoplay
  useEffect(() => {
    const id = setInterval(nextSlide, 4000);
    return () => clearInterval(id); // Cleanup interval on unmount
  }, [nextSlide]);

  // Handle dot click to go to specific slide
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };


  

  return (
    <>
      <Metatags seo={pageData_ && pageData_?.data?.home?.data?.attributes?.seo} />


      <div className="hidden lg:block">
        <Layout
          page="home"
          header="color"
        >
          <>
            <div className="overflow-hidden">
              <div className="slider home-hero-slider">
                <ul className="items">

                  {heroSlideData_ && sliderBanner.map((item, index) => {

                    const mainCat = item.attributes.Category.ProductMainCategory
                    return (

                      <li key={index}
                        className={`items-between  flex bg-${mainCat.toLowerCase()}-900 item ${index === currentIndex ? 'current' : ''} bg-green-400 right-0 w-full`}
                      >
                        <section
                          className={`relative bg-${mainCat.toLowerCase()}-900 pb-[70px] text-${mainCat.toLowerCase()}-100 grid items-top w-full`}
                          style={{
                            backgroundImage: `url(images/${mainCat.toLowerCase()}-hero-bg.webp)`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right bottom',
                            backgroundSize: '50%'
                          }}
                        >
                          <Header
                            page="home"
                            theme={mainCat.toLowerCase()}
                          />

                          <div className="container px-0">
                            <div className="mx-auto 2xl:w-[80%] xl:w-[90%] grid gap-[20px]">
                              <div className="w-[60%]">
                                <h1 className="text-[4.8vw] font-primary leading-[1]">
                                  {item.attributes.Heading}
                                </h1>
                                <h2 className="text-[6vw] font-secondary leading-[1.4] ml-[5%] mt-[-20px]">
                                  {mainCat.toLowerCase()}
                                </h2>
                                <div className="grid gap-[30px]">
                                  <div className="sm:[&>*]:text-[17px] text-[14px] w-[65%]">
                                    <p>
                                      {item.attributes.Description}
                                    </p>
                                  </div>
                                  <div>
                                    <Link
                                      aria-label="Shop Now"
                                      title="Shop Now"
                                      href={'/store'}
                                      onClick={(e) => setThemeLayout('chocolates')}
                                      className={`btn btn-lg px-[30px] bg-transparent cursor-pointer border border-solid border-${mainCat.toLowerCase()}-100 hover:bg-${mainCat.toLowerCase()}-100 text-${mainCat.toLowerCase()}-100 hover:border-${mainCat.toLowerCase()}-100 hover:text-white rounded-full`}
                                    >
                                      Start shopping
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </li>
                    )
                  })}

                </ul>
                {/* <div className="dots"> */}
                {/* {images.map((_, index) => ( */}
                {/* <button */}
                {/* key={index} */}
                {/* className={`dot ${index === currentIndex ? 'current' : ''}`} */}
                {/* onClick={() => handleDotClick(index)} */}
                {/* /> */}
                {/* ))} */}
                {/* </div> */}
              </div>
            </div>


     
            {productsFeatured.length !== 0 ? <section>
            
              <div className="container">
                <div className="mx-auto 2xl:w-[70%] xl:w-[90%]  gap-[20px] md:py-[60px] py-[50px]">
                  <h2 className="text-[16px] uppercase font-semibold mb-[30px]">Featured products</h2>
                  <div className="slider-container slider-featured-items mt-[30px]">
                    <Slider {...featuredProductsSlider}>
                      {featuredProducts_ && productsFeatured.map((item, key) => {

                        const publicReviews = item?.attributes?.reviews?.filter(review => review.showPublic);
                        return (
                          <Card
                            key={key}
                            theme="chocolates"
                            item={item}
                            review={publicReviews ? publicReviews.length : null}
                          />

                        )
                      })}
                    </Slider>
                  </div>
                </div>
              </div>
            </section>
            : null
          }
            <section>
              <div className="container">
                <div className={`mx-auto 2xl:w-[70%] xl:w-[90%] grid gap-[20px] md:py-[60px] py-[70px] justify-end ${productsFeatured.length !== 0 ? 'border-t border-solid border-black ' : null}`}>
                  <div className="md:pl-[15%]">
                    <h3 className="md:text-[30px] text-[26px] uppercase font-medium">
                      {pageData_ && homePageData.Heading}
                    </h3>
                  </div>
                  <div className="grid gap-[4px] md:pl-[40%]">
                    <p>
                      {pageData_ && homePageData.Content[0].children[0].text}
                    </p>
                    <Link
                      href="/about"
                      aria-label="About"
                      title="About"
                      className="font-secondary text-[50px]"
                    >
                      read full
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        </Layout>
      </div>
      <div className="lg:hidden">
        <Layout
          page="home"
          header="color"
        >
          <div className="text-center">

            <section
              className=" bg-chocolates-900 pb-[50px] items-start grid text-chocolates-100" >
              <Header
                page="home2"
                theme='chocolates'
              />
              <div className="container">
                <Images
                  width={300}
                  height={300}
                  quality={100}
                  placeholder={false}
                  imageurl={`/images/${homeTwoData_ && homePageData_0.Category.ProductMainCategory.toLowerCase()}-hero-bg.webp`}
                  classes={'mx-auto w-full block'}
                  alt={homeTwoData_ && homePageData_0.Heading}
                  title={homeTwoData_ && homePageData_0.Heading}
                />


                <div className="container">
                  <div className="grid gap-[10px]">
                    <h1 className="text-[9vw] font-primary leading-[1]">
                      {homeTwoData_ && homePageData_0.Heading}
                    </h1>
                    <h2 className="text-[12vw] font-secondary leading-[1.4] ml-[5%] mt-[-15px]">
                      {homeTwoData_ && homePageData_0.Category.ProductMainCategory}
                    </h2>
                    <div className="grid gap-[30px]">
                      <div className="sm:[&>*]:text-[17px] text-[14px]">
                        <p>
                          {homeTwoData_ && homePageData_0.Description[0].children[0].text}
                        </p>
                      </div>
                      <div>
                        <Link
                          aria-label={homeTwoData_ && homePageData_0.Category.ProductMainCategory} title={homeTwoData_ && homePageData_0.Category.ProductMainCategory} href={`/${homeTwoData_ && homePageData_0.Slug}`} onClick={(e) => setThemeLayout(homeTwoData_ && homePageData_0.Category.ProductMainCategory)}
                          className="btn btn-lg px-[40px] bg-transparent border border-solid border-chocolates-100 hover:bg-chocolates-100 text-chocolates-100 hover:border-chocolates-100 hover:text-white rounded-full"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section
              className=" bg-flowers-900 pt-[50px] items-center grid text-flowers-100" >
              <div className="container">
                <div className="grid gap-[10px]">
                  <h1 className="text-[9vw] font-primary leading-[1]">
                    {homeTwoData_ && homePageData_1.Heading}
                  </h1>
                  <h2 className="text-[12vw] font-secondary leading-[1.4] ml-[5%] mt-[-15px]">
                    {homeTwoData_ && homePageData_1.Category.ProductMainCategory}
                  </h2>
                  <div className="grid gap-[30px]">
                    <div className="sm:[&>*]:text-[17px] text-[14px]">
                      <p>
                        {homeTwoData_ && homePageData_1.Description[0].children[0].text}
                      </p>
                    </div>
                    <div>
                      <Link
                        aria-label={homeTwoData_ && homePageData_1.Category.ProductMainCategory} title={homeTwoData_ && homePageData_1.Category.ProductMainCategory} href={`/${homeTwoData_ && homePageData_1.Slug}`} onClick={(e) => setThemeLayout(homeTwoData_ && homePageData_1.Category.ProductMainCategory)}
                        className="btn btn-lg px-[40px] bg-transparent border border-solid border-flowers-100 hover:bg-flowers-100 text-flowers-100 hover:border-flowers-100 hover:text-white rounded-full"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>

                <Images
                  width={300}
                  height={300}
                  quality={100}
                  placeholder={false}
                  classes={'mx-auto w-full block'}
                  imageurl={`/images/${homeTwoData_ && homePageData_1.Category.ProductMainCategory.toLowerCase()}-hero-bg.webp`}
                  alt={homeTwoData_ && homePageData_1.Heading}
                  title={homeTwoData_ && homePageData_1.Heading}
                />
              </div>
            </section>
            <section
              className=" bg-cakes-900 py-[50px] items-center grid text-cakes-100" >
              <div className="container">
                <div className="items-end flex w-full">
                  <Images
                    width={300}
                    height={300}
                    quality={100}
                    placeholder={false}
                    imageurl={`/images/${homeTwoData_ && homePageData_2.Category.ProductMainCategory.toLowerCase()}-hero-bg.webp`}
                    alt={homeTwoData_ && homePageData_2.Heading}
                    title={homeTwoData_ && homePageData_2.Heading}
                    classes={'max-width-[20%] block mx-auto mb-3'}

                  />
                </div>
                <div className="grid gap-[10px]">
                  <h1 className="text-[9vw] font-primary leading-[1]">
                    {homeTwoData_ && homePageData_2.Heading}
                  </h1>
                  <h2 className="text-[12vw] font-secondary leading-[1.4] ml-[5%] mt-[-15px]">
                    {homeTwoData_ && homePageData_2.Category.ProductMainCategory}
                  </h2>
                  <div className="grid gap-[30px]">
                    <div className="sm:[&>*]:text-[17px] text-[14px]">
                      <p>
                        {homeTwoData_ && homePageData_2.Description[0].children[0].text}
                      </p>
                    </div>
                    <div>
                      <Link
                        aria-label={homeTwoData_ && homePageData_2.Category.ProductMainCategory} title={homeTwoData_ && homePageData_2.Category.ProductMainCategory} href={`/${homeTwoData_ && homePageData_2.Slug}`} onClick={(e) => setThemeLayout(homeTwoData_ && homePageData_2.Category.ProductMainCategory)}
                        className="btn btn-lg px-[40px] bg-transparent border border-solid border-cakes-100 hover:bg-cakes-100 text-cakes-100 hover:border-cakes-100 hover:text-white rounded-full"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>


              </div>
            </section>
            <section
              className=" bg-events-900 py-[50px] items-center grid text-events-100"
              style={{
                backgroundImage: `url('/images/${homeTwoData_ && homePageData_3.Category.ProductMainCategory.toLowerCase()}-hero-bg.webp')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right bottom',
                backgroundSize: '50%'
              }}
            >
              <div className="container">
                <div className="grid gap-[10px]">
                  <h1 className="text-[9vw] font-primary leading-[1]">
                    {homeTwoData_ && homePageData_3.Heading}
                  </h1>
                  <h2 className="text-[12vw] font-secondary leading-[1.4] ml-[5%] mt-[-15px]">
                    {homeTwoData_ && homePageData_3.Category.ProductMainCategory}
                  </h2>
                  <div className="grid gap-[30px]">
                    <div className="sm:[&>*]:text-[17px] text-[14px]">
                      <p>
                        {homeTwoData_ && homePageData_3.Description[0].children[0].text}
                      </p>
                    </div>
                    <div>
                      <Link
                        aria-label={homeTwoData_ && homePageData_3.Category.ProductMainCategory} title={homeTwoData_ && homePageData_3.Category.ProductMainCategory} href={`/${homeTwoData_ && homePageData_3.Slug}`} onClick={(e) => setThemeLayout(homeTwoData_ && homePageData_3.Category.ProductMainCategory)}
                        className="btn btn-lg px-[40px] bg-transparent border border-solid border-events-100 hover:bg-events-100 text-events-100 hover:border-events-100 hover:text-white rounded-full"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Layout>
      </div>

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
        query: `query{
  home{
    data{
      attributes{
         Heading
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


    //HERO DATA
    const heroSlideData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
homeSlideBanners{
  data{
    id
   attributes{
      Category{
        ProductMainCategory
      }
      Heading
      Description
    }
  }
}
}
`,
        variables: { page, pageSize },
      }),
    });
    const heroSlideData_ = await heroSlideData.json();



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



    //PRODUCTS FEATURED CHOCLATES
    const featuredProducts = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
  shops(
    filters: { 
       Featured: { eq: true }
    }, 
    sort: "createdAt:desc",
    pagination: { limit: 5 }
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
      sub_categories{
        data{
          attributes{
            Title
             slug
          }
        }
      }
        Includes
         main_categories {
            data{
          attributes{
            Title
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
`,
        variables: { page, pageSize },
      }),
    });
    const featuredProducts_ = await featuredProducts.json();




    return {
      props: {
        pageData_,
        heroSlideData_,
        homeTwoData_,
        featuredProducts_,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pageData_: null,
        heroSlideData_: null,
        homeTwoData_: null,
        featuredProducts_: null,
      },
    };
  }
}
