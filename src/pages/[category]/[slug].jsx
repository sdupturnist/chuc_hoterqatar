import { adminUrl, frontendUrl, wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useEffect, useState } from "react";
import Cart from "@/components/Cart";
import { useModalContext } from "@/context/modalContext";
import { useRouter } from "next/router";
import Review from "@/components/Review";
import ImageGallery from "react-image-gallery";
import { useProductContext } from "@/context/productContext";
import { useCartContext } from "@/context/cartContext";
import Metatags from "@/components/SeoProducts";
import Images from '@/components/Images';
import { AOSInit } from '@/components/Aos';


export default function ProductSingle({ singleProductData }) {
  const router = useRouter();
  const { query } = router;




  const product = singleProductData?.data?.shops?.data[0]?.attributes;

  const { setModalFor, setShowModal } = useModalContext();
  const { setProductId, setProductReviewCount } = useProductContext();
  const { cartItems, setCartItems } = useCartContext();




  useEffect(() => {
    // Redirect to 404 page if product ID is not available
    if (singleProductData && !singleProductData?.data?.shops?.data[0]?.id) {
      router.push('/404');
    }
  }, [singleProductData, router]);

  // Update product context
  useEffect(() => {
    setProductId(singleProductData?.data?.shops?.data[0]?.id ?? null);
    // setProductReviewCount(reviewData_?.data?.review?.data?.length ?? 0);
  }, []);



  // Initialize cartItems from localStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (Array.isArray(storedItems)) {
      setCartItems(storedItems);
    } else {
      setCartItems([]);
    }
  }, [setCartItems]);


  // Handle rendering while redirecting
  if (singleProductData && !singleProductData?.data?.shops?.data[0]?.id) {
    return null; // Render nothing while redirecting
  }

  const images = product?.photo?.data?.map((item) => ({
    original: adminUrl + item?.attributes?.url,
    thumbnail: adminUrl + item?.attributes?.url,
    originalAlt: item?.attributes?.alternativeText,
    thumbnailAlt: item?.attributes?.alternativeText,
    originalTitle: item?.attributes?.alternativeText,
    thumbnailTitle: item?.attributes?.alternativeText,
  })) || [];

  const openAddReviewModal = () => {
    setShowModal(true);
    setModalFor('add-review');
  };



  const addToCartAndOrder = (id, normalprice, offerprice, name) => {
    if (!id || isNaN(id)) {
      alert('Please enter a valid item ID.');
      return;
    }

    const newItem = {
      id: String(id),
      quantity: 1,
      price: offerprice ?? normalprice,
      name: name,
    };

    const existingItemIndex = cartItems.findIndex(item => item.id === newItem.id);

    let updatedItems;
    if (existingItemIndex !== -1) {
      updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
    } else {
      updatedItems = [...cartItems, newItem];
    }

    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    router.push('/cart');
  };

  const publicReviews = product?.reviews?.filter(review => review.showPublic);

  const reviewCount = publicReviews?.length

  return (
    <>
      <Metatags seo={singleProductData && singleProductData?.data?.shops?.data[0]?.attributes} />
      <Layout page="product-single">
      <AOSInit />
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid sm:gap-[10px] gap-[10px] sm:mb-[50px] mb-[30px] mt-[10px] ">
            <Breadcrumbs
              pages={[
                {
                  "name": `${query.category}`,
                  "link": `/${query.category}`,
                },

                {
                  "name": `${product?.sub_categories?.data[0]?.attributes?.slug.replace(/-/g, ' ').toLowerCase()}`,
                  "link": `/${product?.sub_categories?.data[0]?.attributes?.slug}`,
                },

                {
                  "name": `${product?.Heading ?? null}`,
                  "link": "",
                },
              ]}
            />


            <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-[50px] gap-[30px]">
              <div data-aos="fade-up">
                {!singleProductData && <div className="skeleton mx-auto w-full block rounded-[8px] object-cover sm:min-h-[700px]"></div>}

                {images.length !== 0 && <ImageGallery
                  items={images}
                  showNav={false}
                  lazyLoad={true}
                />}

                {images.length == 0 &&

                  <Images
                    width={500}
                    height={500}
                    quality={100}
                    placeholder={false}
                    imageurl={frontendUrl + 'images/plcaeholder-ni-image.webp'}
                    classes={'w-full object-cover rounded-[10px] aspect-square'}
                    alt={'Sorry no image available'}
                    title={'Sorry no image available'}
                  />


                }

              </div>
              <div data-aos="fade-up" data-aos-delay="500" className="items-center lg:px-[20px]">
                <div>
                  {!singleProductData && <div className="flex w-full flex-col gap-4">
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>}
                  <span className='block text-[16px] text-black text-opacity-50 mb-[10px]'>{product?.mainCategory?.ProductMainCategory ?? null}</span>
                  <h1 className="sm:text-[40px] text-[6.5vw] font-semibold">{product?.Heading ?? null}</h1>
                  {reviewCount > 0 ? <span className='flex gap-[10px] text-[16px] text-black text-opacity-50 items-center mt-[14px]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" className='mb-[1px]' height="16" fill="none" viewBox="0 0 13 13">
                      <path fill="#E7B66B" d="M5.678.864C6.02.046 7.18.046 7.522.864l.969 2.312a1 1 0 0 0 .84.61l2.498.207c.884.073 1.242 1.175.57 1.754l-1.9 1.636a1 1 0 0 0-.32.987l.575 2.44c.204.863-.734 1.545-1.492 1.084l-2.143-1.301a1 1 0 0 0-1.038 0l-2.143 1.301c-.758.46-1.696-.22-1.492-1.084l.576-2.44a1 1 0 0 0-.321-.987L.8 5.747c-.672-.579-.314-1.681.57-1.754l2.498-.207a1 1 0 0 0 .84-.61l.97-2.312Z" />
                    </svg>
                    {reviewCount} Reviews
                  </span>
                    :
                    null
                  }
                  <span className='flex gap-[14px] mt-[32px]'>
                    {product?.offerPrice && <del className='text-[24px] font-normal opacity-60'>
                      {product?.normalPrice ?? null} QR
                    </del>
                    }
                    <span className='text-[24px] font-bold'>
                      {product?.offerPrice ?? null}
                      {!product?.offerPrice && <span>{product?.normalPrice ?? null}</span>} QR {product?.Unit && <span className='text-[11px] font-light uppercase '>/ {product?.Unit}</span>}
                    </span>
                  </span>

                  {product?.ShortDescription &&
                    <>
                      <div className="text-gray-500 sm:mt-[30px] mt-[34px]" dangerouslySetInnerHTML={{ __html: product?.ShortDescription }} />
                    </>
                  }
                  <div className="sm:flex grid items-center gap-[10px] w-full mt-[40px]">
                    <Cart
                      itemid={singleProductData?.data?.shops?.data[0]?.id ?? null}
                      size="sm:max-w-[170px] w-full min-w-[171px]"
                      price={product?.offerPrice !== null ? product?.offerPrice : product?.normalPrice}
                      name={product?.Heading}
                    />

                    <button onClick={(e) => addToCartAndOrder(
                      singleProductData?.data?.shops?.data[0]?.id ?? null,
                      product?.normalPrice ?? null,
                      product?.offerPrice ?? null,
                      product?.Heading ?? null)}
                      className="btn border border-black border-solid bg-black hover:bg-gray-900  rounded-[6px] sm:max-w-[170px] min-w-[170px] min-h-[60px] text-white">Add to cart</button>
                  </div>
                  {product?.productCode && <span className="block text-[12px] uppercase text-gray-400 sm:my-[40px] mb-[30px] mt-[40px]">Product code:
                    <span className="text-black pl-2">
                      #{product?.productCode}
                    </span>
                  </span>}

                  {
                    !reviewCount &&
                    <button
                      className="btn border border-black text-black border-solid bg-white sm:mt-[32px] mt-[24px] hover:bg-gray-900  rounded-[6px] sm:w-[170px] w-[100%] min-h-[60px] hover:text-white"
                      onClick={openAddReviewModal}
                    >
                      Write a review
                    </button>
                  }

                </div>
              </div>
            </div>

            <div className="mt-[32px]" data-aos="fade-up">
              <div role="tablist" className="tabs tabs-lifted md:mt-[40px]">

                {product.Includes &&
                  (
                    <>
                      <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        defaultChecked={product.Includes}
                        className="tab rounded-lg !border-black uppercase sm:text-[16px] text-[14px] font-semibold tracking-[1%] min-h-[50px] border-b border-solid sm:min-w-[150px] min-w-[120px]"
                        aria-label="Includes"
                      />

                      <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-black rounded-lg sm:p-[32px] p-[24px]"
                      >
                        <div
                          className="[&>*]:text-gray-500 [&>*]:mb-4 [&>*]:block ht-content"
                        >
                          <div dangerouslySetInnerHTML={{ __html: product?.Includes && product?.Includes }} />
                        </div>
                      </div>
                    </>
                  )
                }


                {product.Description &&
                  (
                    <>
                      <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        defaultChecked={!product.Description}
                        className="tab rounded-lg !border-black uppercase sm:text-[16px] text-[14px] font-semibold tracking-[1%] min-h-[50px] border-b border-solid sm:min-w-[150px] min-w-[120px]"
                        aria-label="Description"
                      />

                      <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-black rounded-lg sm:p-[32px] p-[24px]"
                      >
                        <div
                          className="[&>*]:text-gray-500 [&>*]:mb-4 [&>*]:block ht-content"
                        >
                          <div dangerouslySetInnerHTML={{ __html: product?.Description && product?.Description }} />
                        </div>
                      </div>
                    </>
                  )
                }


                {reviewCount > 0 &&
                  <>
                    <input type="radio"
                      defaultChecked={!product.Includes || !product.Description}
                      name="my_tabs_2" role="tab"
                      className="tab rounded-lg !border-black uppercase sm:text-[16px] text-[14px] font-semibold tracking-[1%] min-h-[50px] border-b border-solid sm:min-w-[150px] min-w-[120px]"
                      aria-label={`${reviewCount} Reviews`} />
                    <div role="tabpanel" className="tab-content bg-base-100 border-black rounded-lg sm:p-[32px] p-[24px]">
                      <ul className="grid review-list">
                        {publicReviews && publicReviews.map((item, key) => {
                          return (
                            <Review
                              key={key}
                              data={item}
                            />
                          )
                        })}
                      </ul>
                    </div>
                  </>
                }
              </div>

              {product.Description || product.Includes || reviewCount > 0
                ? <button
                  className="btn border border-black border-solid bg-white sm:mt-[32px] mt-[24px] hover:bg-gray-900  rounded-[6px] sm:w-[170px] w-[100%] min-h-[60px] hover:text-white"
                  onClick={openAddReviewModal}
                >
                  Write a review
                </button> :
                null
              }

            </div>

          </div>
        </div>
      </Layout>
    </>
  );
}



export async function getStaticProps(context) {
  const { params } = context;
  const { category, slug } = params;

  try {
    // Fetch single product data based on category and slug
    const productDataResponse = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            shops(filters: { Slug: { eq: "${slug}" }, main_categories: { Slug: { eq: "${category}" } } }) {
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
                  Includes
                  ShortDescription
                  main_categories {
                    data {
                      attributes {
                        Slug
                      }
                    }
                  }
                  sub_categories {
                    data {
                      attributes {
                        slug
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
            }
          }
        `,
      }),
      cache: 'no-store'
    });

    const singleProductData = await productDataResponse.json();

    return {
      props: {
        singleProductData,
      },
      revalidate: 30, // Revalidate every 30 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        singleProductData: null,
      },
      revalidate: 30, // Still revalidate even if there's an error
    };
  }
}

export async function getStaticPaths() {
  // You can implement a way to generate paths if needed.
  return {
    paths: [],
    fallback: 'blocking', // Use 'blocking' to support dynamic routes
  };
}