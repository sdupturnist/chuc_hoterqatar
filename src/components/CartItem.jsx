import Cart from "@/components/Cart";
import Images from '@/components/Images';
import { useCartContext } from "@/context/cartContext";
import { adminUrl } from "@/utils/variables";
import Link from "next/link";
import { useEffect, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function CartItem({ item, color }) {
    const { cartItems, setCartItems } = useCartContext();
    const [quantity, setQuantity] = useState(1);
    const itemid = item.id;



  // Load items from localStorage on component mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, []);







    


    const removeFromCartConfirm = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    return (
        <div className="sm:rounded-[6px] sm:border border-b border-solid border-gray-200 sm:p-[20px] py-[24px] sm:flex justify-between">
            <div className="flex md:items-center items-start gap-[20px] w-full">
                <Link href={`/${item.main_category}/${item.slug}`}>
                    <Images
                        width={item?.attributes?.photo?.data[0]?.attributes?.width ?? '170'}
                        height={item?.attributes?.photo?.data[0]?.attributes?.height ?? '170'}
                        quality={100}
                        placeholder={true}
                        imageurl={item?.attributes?.photo?.data[0]?.attributes?.url && adminUrl + (item?.attributes?.photo?.data[0]?.attributes?.url)}
                        classes='md:w-[60px] md:h-[60px] md:min-w-[60px] md:min-h-[60px] w-[100px] h-[130px] min-w-[130px] min-h-[130px] object-cover rounded-[4px]'
                        alt={item?.attributes?.photo?.data[0]?.attributes?.alternativeText ?? 'Product'}
                        title={item?.attributes?.photo?.data[0]?.attributes?.alternativeText ?? 'Product'}
                    />
                </Link>

                <div className="md:flex items-center justify-between w-full">
                    <div className="grid gap-[4px] pr-5 w-full relative">
                        <button
                         id="removeFromCart"
                         onClick={(e) => removeFromCartConfirm(itemid)}
                        className="md:hidden absolute right-0 top-0">
                          <XMarkIcon className="text-black size-4"/>
                        </button>
                        <Link href={`/${item.main_category}/${item.slug}`}>
                            <h4 className='text-[14px] text-black'>{item?.attributes?.Heading}</h4>
                        </Link>
                        <span className='block text-[12px] text-black text-opacity-80'>{item?.attributes?.subcategory?.allsubcategories?.replace(/_/g, ' ')}</span>
                    </div>

                    <div className="sm:flex grid items-center justify-between sm:gap-[24px] gap-[14px] mt-4 md:mt-0 w-full">
                        <Cart
                        itemid={item.id}
                        price={item?.attributes?.offerPrice !== null ? item?.attributes?.offerPrice : item?.attributes?.normalPrice}
                        />
                       <span className='flex gap-[8px]'>
                          <span className='block font-semibold text-[16px] uppercase'>
                                {item?.attributes?.offerPrice !== null ? item?.attributes?.offerPrice : item?.attributes?.normalPrice}
                                QR
                            </span>
                        </span>

                        
                        <button
                            id="removeFromCart"
                            onClick={(e) => removeFromCartConfirm(itemid)}
                            className="hidden md:flex">
                            <XMarkIcon className="text-black size-4"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
