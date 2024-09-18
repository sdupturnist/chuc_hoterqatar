



import Layout from '@/components/Layout'
import Link from 'next/link'
import { frontendUrl } from '@/utils/variables'
import { useCartContext } from '@/context/cartContext'
import { useEffect } from 'react'



export default function OrderSuccess() {


    const {cartItems, setCartItems} = useCartContext()

useEffect(() => {
    setCartItems(null)
  
}, [cartItems]);


  


    return (
        <>
            <Layout
                page="404"
            >
           
                <div className="container [&>*]:text-black">
                    <div className="mx-auto 2xl:w-[70%] xl:w-[80%] h-[80vh] sm:w-[80%] w-[90%] flex justify-center items-center text-center">
                        <div className='grid sm:gap-[40px] gap-[16px]'>
                      <h1 className='lg:text-[4vw] sm:text-[50px] text-[22px] leading-[34px] sm:font-normal font-semibold'>Thank you for your order!</h1>
                            <p className="md:text-[1.6rem] text-[1rem] mb-[20px] text-gray-500">Your order has been successfully placed. We appreciate your purchase and are excited to get your items to you!</p>
                            <Link title="Back to home" aria-label="Back to home" href={frontendUrl} className="btn border border-black border-solid bg-black hover:bg-gray-900  rounded-[6px] sm:max-w-[170px] min-w-[170px] min-h-[60px] text-white mx-auto">Back to home</Link>

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}