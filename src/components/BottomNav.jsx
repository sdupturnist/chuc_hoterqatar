import { useThemeContext } from "@/context/themeContext";
import Link from "next/link";


export default function BottomNav() {

    const { themeLayout, setThemeLayout } = useThemeContext()


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






    return (<>
        <div className="py-[14px] [&>*]:text-[12px] uppercase font-light tracking-wider fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 border-solid lg:hidden">
     
            <div className="container">
                <div className="flex justify-between items-center">
                    <Link
                        aria-label='Chocolates' title='Chocolates' href={"/chocolates"} onClick={(e) => setThemeLayout('chocolates')}
                        className="chocolate grid items-center justify-center gap-[6px] text-black"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" className="mx-auto" fill="none" viewBox="0 0 23 23">
                            <path stroke= {themeLayout.toLowerCase() == 'chocolates' ?  color : '#c89a3f'} d="m10.564 5.433-.142-.125a1.14 1.14 0 0 1 .394-1.938l.192-.064a1.304 1.304 0 0 1 1.372.354c.828.9.589 2.339-.486 2.923l-.085.046-.066.036a2.814 2.814 0 1 1-2.645-4.967l1.466-.765m0 0-.652.157a11.24 11.24 0 0 0-8.417 8.82l-.778 4.074a2.925 2.925 0 0 0 1.449 3.104 17.919 17.919 0 0 0 17.823-.213l.262-.154a3.012 3.012 0 0 0 1.475-2.813l-.066-.906a12.864 12.864 0 0 0-3.018-7.391l-1.024-1.208a8.487 8.487 0 0 0-1.916-1.671 11.775 11.775 0 0 0-4.504-1.7l-.634-.099Z" />
                            <path stroke= {themeLayout.toLowerCase() == 'chocolates' ?  color : '#c89a3f'} d="m20.135 7.922-.359.392a17.004 17.004 0 0 1-15.43 5.263l-3.358-.581" />
                            <path stroke= {themeLayout.toLowerCase() == 'chocolates' ?  color : '#c89a3f'} d="m1.848 8.783.117.05a21.585 21.585 0 0 0 8.335 1.674h.492c.291 0 .582-.026.868-.077 3.438-.609 5.196-4.477 3.393-7.467l-.473-.785" />
                        </svg>
                        Chocolates
                    </Link>
                    <Link
                        aria-label='Flowers' title='Flowers' href={"/flowers"} onClick={(e) => setThemeLayout('flowers')}
                        className="flowers grid items-center justify-center gap-[6px] text-black"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" className="mx-auto" fill="none" viewBox="0 0 25 25">
                            <path fill={themeLayout.toLowerCase() == 'flowers' ?  color : '#c89a3f'} fillRule="evenodd" d="m13.335 1.874-.287-.202-.287.202-.168.117a13.065 13.065 0 0 0-3.849 4.227 14.868 14.868 0 0 0-3.278-1.51l-.064-.02-.652-.209v3.122a9.93 9.93 0 0 0 1.469 5.197 8.986 8.986 0 0 0 4.54 3.726l1.648.609v3.873L8.452 19.03l-.447.894 4.727 2.362.225.113.224-.114 4.679-2.361-.45-.893-3.954 1.995v-3.893l1.647-.61a8.987 8.987 0 0 0 4.54-3.725 9.93 9.93 0 0 0 1.47-5.197V4.48l-.653.21-.064.02a14.87 14.87 0 0 0-3.105 1.404 13.064 13.064 0 0 0-3.788-4.122l-.168-.117Zm3.115 4.782a12.065 12.065 0 0 0-3.402-3.761A12.065 12.065 0 0 0 9.58 6.774a14.871 14.871 0 0 1 3.352 3.314 14.87 14.87 0 0 1 3.52-3.432Zm-3.519 4.255.025.016h-.05l.025-.016Zm-.524.169v4.987l-1.301-.481a7.987 7.987 0 0 1-4.035-3.311A8.93 8.93 0 0 1 5.75 7.6V5.864a13.87 13.87 0 0 1 6.657 5.216Zm1.049 4.987V11.08a13.87 13.87 0 0 1 6.656-5.216v1.737a8.93 8.93 0 0 1-1.32 4.674 7.987 7.987 0 0 1-4.036 3.31l-1.3.482Z" clipRule="evenodd" />
                        </svg>

                        Flowers
                    </Link>
                    <Link
                        aria-label='Cakes' title='Cakes' href={"/cakes"} onClick={(e) => setThemeLayout('cakes')}
                        className="cakes grid items-center justify-center gap-[6px] text-black"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" className="mx-auto" fill="none" viewBox="0 0 25 25">
                            <path stroke={themeLayout.toLowerCase() == 'cakes' ?  color : '#c89a3f'} d="M3.894 17.188H2.18l.585 1.656a3.99 3.99 0 0 0 1.318 1.83 3.809 3.809 0 0 0 2.33.8H18.82a3.8 3.8 0 0 0 1.863-.489 4.011 4.011 0 0 0 2.011-3.152l.057-.645h-1.47m-17.387 0v-4.791c0-.921.59-1.667 1.51-1.677 1.408-.014 3.256-.054 4.664-.054h7.295c.489 0 1.247.012 1.967.025a1.99 1.99 0 0 1 1.952 1.994v4.503m-17.388 0h17.388m-2.94-14.084-.61-.235a3.74 3.74 0 0 0-2.697 0c-.404.155-.78.38-1.111.664l-.969.831M16.14 7.39c0 1.81-1.425 3.277-3.184 3.277-1.758 0-3.183-1.467-3.183-3.277s1.425-3.277 3.183-3.277c1.758 0 3.184 1.468 3.184 3.277Z" />
                        </svg>

                        Cakes
                    </Link>
                    <Link
                        aria-label='Events' title='Events' href={"/events"} onClick={(e) => setThemeLayout('events')}
                        className="events grid items-center justify-center gap-[6px] text-black"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" className="mx-auto" fill="none" viewBox="0 0 25 25">
                            <path fill={themeLayout.toLowerCase() == 'events' ?  color : '#c89a3f'} fillRule="evenodd" d="M9.35 2.545h7.178l.15.213 1.456 2.08.2.287-.2.287L16.45 7.83a8.115 8.115 0 0 1-3.3 15.528A8.114 8.114 0 0 1 9.534 7.98l-1.79-2.567-.2-.287.201-.286 1.456-2.08.15-.214Zm.763 6.265a7.114 7.114 0 1 0 5.752-.142l-2.515 3.609-.41.589-.41-.59-2.417-3.466Zm-.242-5.265-.697.997h4.598v1H9.054l3.886 5.575 4.175-5.99-1.107-1.582H9.871Z" clipRule="evenodd" />
                        </svg>

                        Events
                    </Link>
                </div>
            </div>
        </div>
    </>)
}