import { useModalContext } from "@/context/modalContext";
import { useThemeContext } from "@/context/themeContext";
import Link from "next/link";




export default function PageHeader({ title, type, data }) {




    const { themeLayout } = useThemeContext();
    const { setModalFor, setShowModal } = useModalContext();




    const getTotalSubcategoryCount = (data) => {
        if (!data?.data?.shops?.data) {
            return 0;
        }
        const subcategoriesSet = new Set();
        data.data.shops.data.forEach(item => {
            const subcategory = item?.attributes?.sub_category?.data?.attributes?.slug;;
            subcategoriesSet.add(subcategory);
        });

        return subcategoriesSet.size;
    };


    const totalSubcategoryCount = getTotalSubcategoryCount(data);


    const FilteredCategories = (themeLayout) => {
      
      // Extract and filter subcategories
    const subCategories = data?.data.shops.data.flatMap(shop =>
        shop.attributes.sub_categories.data.map(cat => cat.attributes.slug)
    );

    // Remove duplicates by converting to a Set
    const uniqueSubCategories = [...new Set(subCategories)];

    // Limit to the first 4 unique subcategories
    const limitedSubCategories = uniqueSubCategories.slice(0, 3);

    return (
      
            limitedSubCategories.length > 0 ? (
                limitedSubCategories.map((category, index) => (
                    <Link
                        key={index}
                        aria-label={category.replace(/-/g, ' ')}
                        className={`btn bg-transparent hover:bg-${themeLayout.toLowerCase()}-100 hover:border-${themeLayout.toLowerCase()}-100 text-${themeLayout.toLowerCase()}-100 hover:text-white border border-solid rounded-[6px] !capitalize !font-regular !text-[13px]`}
                        title={category.replace(/-/g, ' ')}
                        href={`/${category.replace(/-/g, '-').toLowerCase()}`}
                    >
                        {category.replace(/-/g, ' ')}
                    </Link>
                ))
            ) : (
                null
            )
      
    );
    };

    


    const FilteredCategoriesMore = (themeLayout) => {
      
        // Extract and filter subcategories
      const subCategories = data?.data.shops.data.flatMap(shop =>
          shop.attributes.sub_categories.data.map(cat => cat.attributes.slug)
      );
  
      // Remove duplicates by converting to a Set
      const uniqueSubCategories = [...new Set(subCategories)];
  
      // Limit to the first 4 unique subcategories
      const limitedSubCategories = uniqueSubCategories.slice(0, 50);
  
      return (
        
              limitedSubCategories.length > 0 ? (
                  limitedSubCategories.map((category, index) => (
                     <li key={category.replace(/-/g, '-').toLowerCase()} className="!block">
                            <Link
                                aria-label={category.replace(/-/g, ' ')}
                                className={`w-full px-[15px]  rounded-none hover:bg-transparent sm:hover:bg-${themeLayout.toLowerCase()}-100  text-${themeLayout.toLowerCase()}-100 btn bg-transparent border-0 hover:border-gray-300 !capitalize !font-regular !text-[13px]`}
                                title={category.replace(/-/g, ' ')}
                                href={`/${category.replace(/-/g, '-').toLowerCase()}`}>
                                {category.replace(/-/g, ' ')}
                            </Link>
                        </li>
                  ))
              ) : (
                  null
              )
        
      );
      };


    
    



    const openFilterModal = () => {
        setShowModal(true);
        setModalFor('filter');
    };




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



    let pageHeaderType;

    switch (type) {
        case 'cat':
            pageHeaderType = (
                <div className="xl:flex  justify-between xl:items-end gap-[30px] w-full">
                    <div className="xl:w-[50%] hidden lg:block">
                        <h1 className={`font-primary first-letter:uppercase text-[40px] text-${themeLayout.toLowerCase()}-100`}>{title}</h1>
                        <p className="text-gray-500">Explore our Exquisite Collection</p>
                    </div>
                    <div className="flex xl:w-[50%] gap-[6px] w-full mt-[20px] xl:mt-[0]">
                        <div className="flex gap-[6px] w-full xl:justify-end">



                            {/* <Link
                                aria-label={title.replace(/-/g, ' ')}
                                style={{ background: color }}
                                className={`${themeLayout == 'gray' ? 'text-black' : 'text-white'} btn hover:border-${themeLayout.toLowerCase()}-100 border border-solid rounded-[6px] !capitalize !font-regular !text-[13px] sm:flex`}
                                title={title.replace(/-/g, ' ')}
                                href={`/${data?.data?.shops?.data[0]?.attributes?.main_categories?.data[0].attributes?.Slug.replace(/ /g, '-').toLowerCase()}`}>
                                all
                            </Link> */}
                            <div className="sm:flex hidden gap-2">
                            {FilteredCategories(themeLayout)}
                            </div>
                            <div className="dropdown dropdown-hover sm:dropdown-end dropdown-start  rounded-[6px] hover:bg-transparent !hover:text-white">
                                <div tabIndex={0} role="button" className={`btn px-[20px] bg-transparent text-${themeLayout}-100 hover:bg-white hover:border-gray-100 !hover:text-white border border-solid rounded-[6px] !capitalize !font-regular !text-[13px] px-[10px]`}>
                               <span className={`text-${themeLayout.toLowerCase()}-100 sm:hidden`}> Categories</span>
                               <span className={`text-${themeLayout.toLowerCase()}-100  hidden sm:block`}> View all</span>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100  z-[1] w-52 p-0 shadow overflow-hidden rounded-[6px] m-0">
                                    {FilteredCategoriesMore(themeLayout)}
                                </ul>
                            </div>
                            {totalSubcategoryCount > 3 ? <div className="dropdown dropdown-hover dropdown-end  rounded-[6px]">
                                <div tabIndex={0} role="button" className={`btn bg-transparent hover:bg-gray-100 hover:border-gray-100 hover:text-white border border-solid rounded-[6px] !capitalize !font-regular !text-[13px] px-[10px]`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="32" fill={themeLayout} viewBox="0 0 256 256"><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path></svg>
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100  z-[1] w-52 p-0 shadow overflow-hidden rounded-[6px]">
                                    {FilteredCategoriesMore(themeLayout)}
                                </ul>
                            </div> : null}
                        </div>
                        <button onClick={openFilterModal} className={`btn bg-transparent hover:bg-gray-100 hover:border-gray-100 hover:text-white border border-solid rounded-[6px] !capitalize !font-regular !text-[13px]`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="none" viewBox="0 0 19 16">
                                <path fill={color} stroke={color} strokeWidth=".4" d="M1.125 4.236H4.36a2.825 2.825 0 0 0 5.53 0h7.735a.575.575 0 1 0 0-1.15H9.89a2.825 2.825 0 0 0-5.53 0H1.125a.575.575 0 1 0 0 1.15Zm6-2.25a1.675 1.675 0 1 1 0 3.35 1.675 1.675 0 0 1 0-3.35Zm10.5 10.1H15.89a2.825 2.825 0 0 0-5.53 0H1.125a.575.575 0 1 0 0 1.15h9.235a2.825 2.825 0 0 0 5.53 0h1.735a.575.575 0 0 0 0-1.15Zm-4.5 2.25a1.676 1.676 0 1 1 0-3.35 1.676 1.676 0 0 1 0 3.35Z" />
                            </svg>

                        </button>
                    </div>
                </div>
            );
            break;

        default:
            pageHeaderType = (
                <div className="text-center sm:[&>h1]:text-[30px] [&>h1]:text-[20px] [&>h1]:font-semibold [&>h1]:uppercase sm:py-[50px] py-[20px]">
                    <h1>{title}</h1>
                </div>
            );
            break;
    }

    return pageHeaderType;
}
