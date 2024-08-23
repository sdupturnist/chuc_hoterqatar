

'use client'
import React, {useState, useEffect} from 'react';
import { AOSInit } from './Aos';
import Layout from './Layout';




const NoInternetConnection = (props) => {
    // state variable holds the state of the internet connection
    const [isOnline, setOnline] = useState(true);







    // On initization set the isOnline state.
    useEffect(()=>{
        setOnline(navigator.onLine)

        
    // event listeners to update the state 
    window.addEventListener('online', () => {
        setOnline(true)
    });

    window.addEventListener('offline', () => {
        setOnline(false)
    });


    
    },[])

    // if user is online, return the child component else return a custom component
    if(isOnline){
    return(
        props.children
    )
    } else {
        return(
            <Layout
            page="no-internet"
        >
           
            <div className="container [&>*]:text-black">
                <div className="mx-auto 2xl:w-[70%] xl:w-[80%] h-[80vh] w-[80%] flex justify-center items-center text-center">
                    <div className='grid sm:gap-[40px] gap-[16px]'>
                        <h1 className='lg:text-[4vw] sm:text-[50px] text-[32px] leading-[1]'>No internet connection</h1>
                        <p className="md:text-[1.6rem] text-[1rem] mb-[20px] text-gray-500"> Please check your internet connection and try again</p>
                        </div>
                </div>
            </div>
        </Layout>
        )
    }
}

export default NoInternetConnection;