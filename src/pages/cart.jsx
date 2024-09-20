import { frontendUrl, deliveryFee, wordpressGraphQlApiUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from '@/components/Seo';
import Breadcrumbs from "@/components/Breadcrumbs";
import { useCartContext } from "@/context/cartContext";
import { useEffect, useState } from "react";
import OrderForm from "@/components/Forms/OrderForm";
import CartItem from "@/components/CartItem";
import NoData from "@/components/Nodata";
import { AOSInit } from "@/components/Aos";
import { useThemeContext } from "@/context/themeContext";


export default function Cart({ pageData_, allProducts_ }) {
  const pageData = pageData_.data.itemsCart.data.attributes;
  const allProducts = allProducts_?.data?.shops?.data;
 
  const { themeLayout } = useThemeContext();
  const { cartItems } = useCartContext();

  const filteredProducts = allProducts.filter(product =>
    cartItems && cartItems.some(item => item.id === product.id)
  );

  useEffect(() => {
    const storedData = localStorage.getItem('cartData');
    if (storedData) {
      setCartData(JSON.parse(storedData));
    }
  }, []);

  // Calculate the total amount
  const totalAmount = cartItems?.reduce((total, item) => {
    return total + (item?.quantity * item?.price);
  }, 0);

  // State for order
  const [currentOrder, setCurrentOrder] = useState([]);

  // Update order when totalAmount changes
  useEffect(() => {
    const updatedOrder = [...filteredProducts, { totalAmount }];
    setCurrentOrder(updatedOrder);
  }, [totalAmount]);


  
    // Determine button color based on theme
    let color;
    switch (themeLayout.toLowerCase()) {
        case "white":
            color = "white";
            break;
        case 'chocolates':
            color = "#c89a3f";
            break;
        case 'flowers':
            color = "#E62263";
            break;
        case 'cakes':
            color = "#E79F02";
            break;
        case 'events':
            color = "#258F89";
            break;
        default:
            color = "#c89a3f";
            break;
    }


  return (
    <>
      <Metatags seo={pageData_ && pageData_?.data?.itemsCart?.data?.attributes?.seo} />
      <Layout page="cart">
        <AOSInit/>
        <div className="container [&>*]:text-black">
          <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid">
            <div className="flex justify-between items-center border-b border-black">
              <h1 className="uppercase text-[20px] font-semibold tracking-[1%] sm:my-[20px] my-[10px]">
                {pageData_ && pageData.Title}
              </h1>
              <Breadcrumbs
                pages={[
                  {
                    "name": "order",
                    "link": "",
                  },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-[10px] lg:gap-[50px] lg:mb-0 mb-[30px]">
              <div className={`${cartItems && cartItems.length !== 0 ? 'lg:col-span-3' : 'lg:col-span-12'} sm:py-[50px]`} data-aos="fade-up">
                {cartItems && cartItems.length !== 0 ? (
                  <div className="cart-item-wrpr grid sm:gap-[16px] border-b lg:border-none border-black border-solid sm:pb-[20px] lg:pb-[0]">
                    {filteredProducts.map((product, key) => {
                      // Find the corresponding added item to get quantity
                      const addedItem = cartItems.find(item => item.id === product.id);
                      const quantity = addedItem ? addedItem.quantity : 0;

                      return (
                        <CartItem
                          key={key}
                          item={product}
                          price={product?.attributes?.offerPrice !== null ? product?.attributes?.offerPrice : product?.attributes?.normalPrice}
                          color={color}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <NoData title={`Your cart is empty`} />
                )}

                {cartItems && cartItems.length !== 0 &&
                  <div className="lg:border lg:rounded-[6px] rounded-none border-solid lg:border-gray-200 border-black lg:p-[20px] py-[16px] lg:mt-[20px] lg:border-t ">
                    <p className="flex justify-between w-full border-b border-solid border-gray-200 pb-[16px]">
                      <span className="block text-black text-opacity-50">Subtotal</span>
                      <span className="block text-black text-opacity-50">{totalAmount} QR</span>
                    </p>
                    <p className="flex justify-between w-full border-b border-solid border-black py-[16px]">
                      <span className="block text-black text-opacity-50">Delivery fee</span>
                      <span className="block text-black text-opacity-50">{deliveryFee} QR</span>
                    </p>
                    <p className="flex justify-between w-full lg:pt-[16px] pt-[16px] pb-[4px]">
                      <span className="block font-semibold text-[16px] uppercase">
                        Total
                      </span>
                      <span className="block font-semibold text-[16px] uppercase">
                        {parseFloat(totalAmount) + parseFloat(deliveryFee)} QR
                      </span>
                    </p>
                  </div>
                }
              </div>
              {cartItems && cartItems.length !== 0 &&
                <div className="lg:col-span-2 lg:border-l border-black border-solid lg:p-[50px]"  data-aos="fade-in" data-aos-delay="500">
                  <OrderForm
                    totalAmount={parseFloat(totalAmount) + parseFloat(deliveryFee)}
                    items={cartItems}
                  />
                </div>
              }
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  try {
    // Fetch data for items in the cart
    const pageDataResponse = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          itemsCart {
            data {
              attributes {
                Title
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

    // Fetch all products
    const allProductsResponse = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          shops(
            pagination: { limit: 500 }
          ) {
            data {
              id
              attributes {
                Slug
                Heading
                normalPrice
                offerPrice
                productCode
                sub_categories {
                  data {
                    attributes {
                      Title
                      slug
                    }
                  }
                }
                main_categories {
                  data {
                    attributes {
                      Title
                      Slug
                    }
                  }
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
        }`,
      }),
    });
    const allProducts_ = await allProductsResponse.json();

    return {
      props: {
        pageData_,
        allProducts_,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        pageData_: null,
        allProducts_: null,
      },
      revalidate: 60, // Optional: still allow revalidation even on error
    };
  }
}
