



import Layout from '@/components/Layout'
import Link from 'next/link'
import { frontendUrl } from '@/utils/variables'


export default function NotFound() {
    return (
        <>
            <Layout
                page="404"
            >
               
                <div className="container [&>*]:text-black">
                    <div className="mx-auto 2xl:w-[70%] xl:w-[80%] h-[80vh] w-[80%] flex justify-center items-center text-center">
                        <div className='grid sm:gap-[40px] gap-[16px]'>
                            <h1 className='lg:text-[4vw] sm:text-[50px] text-[32px] leading-[1]'>Oops! page not found</h1>
                            <p className="md:text-[1.6rem] text-[1rem] mb-[20px] text-gray-500">The page you are looking for does not exist. Go back to the main page.</p>
                            <Link title="Back to home" aria-label="Back to home" href={frontendUrl} className="btn border border-black border-solid bg-black hover:bg-gray-900  rounded-[6px] sm:max-w-[170px] min-w-[170px] min-h-[60px] text-white mx-auto">Back to home</Link>

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}