import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import { CategoryData } from "@/hooks/categoryData";
import { ContactData } from "@/hooks/contactData";
import { useThemeContext } from "@/context/themeContext";





export default function Footer({ page, initialData }) {


  const { dataCategory } = CategoryData(initialData);

  const { dataContact } = ContactData(initialData);

  const contactData = dataContact && dataContact.data.contactInfos.data[0].attributes
  const { themeLayout, setThemeLayout } = useThemeContext()




  const FilteredCategories = () => {
    // Define custom order
    const customOrder = ['Chocolates', 'Flowers', 'Cakes', 'Events']; // Adjust according to your custom order

    // Ensure dataCategory and its nested properties are defined before processing
    const categoriesMap = dataCategory?.data?.shops?.data.reduce((acc, item) => {
      // Extract main category title
      const mainCategories = item?.attributes?.main_categories?.data || [];

      // Extract subcategories
      const subcategories = item?.attributes?.sub_categories?.data || [];

      // Process each main category
      mainCategories.forEach(mainCategoryItem => {
        const mainCategory = mainCategoryItem?.attributes?.Title;

        if (mainCategory) {
          // Initialize the set if it does not exist
          if (!acc[mainCategory]) {
            acc[mainCategory] = new Set();
          }

          // Add each subcategory to the set if it's not empty
          subcategories.forEach(subcatItem => {
            const subcategory = subcatItem?.attributes?.slug;
            if (subcategory) {
              acc[mainCategory].add(subcategory);
            }
          });
        }
      });

      return acc;
    }, {});

    // Check if categoriesMap is defined and filter out categories with no subcategories
    const filteredCategories = categoriesMap
      ? Object.entries(categoriesMap).filter(([mainCategory, subcategories]) => subcategories.size > 0)
      : [];

    // Sort categories based on custom order
    const sortedCategories = filteredCategories.sort(([a], [b]) => {
      const indexA = customOrder.indexOf(a);
      const indexB = customOrder.indexOf(b);

      // Handle categories not in customOrder by placing them at the end
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });

    // Return null if there are no categories to display
    if (sortedCategories.length === 0) return null;

    return (
      <>
        {sortedCategories.map(([mainCategory, subcategories]) => (
          <div className="" key={mainCategory}>
            <h4 className="text-[15px] font-semibold uppercase mb-[24px]">{mainCategory}</h4>
            <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
              {[...subcategories].map((subcategory, index) => (
                <li key={index}>
                  <Link
                    onClick={() => {
                      setThemeLayout(mainCategory);
                    }}
                    aria-label={subcategory?.replace(/-/g, ' ')}
                    title={subcategory?.replace(/-/g, ' ')}
                    href={`/${subcategory?.replace(/-/g, '-').toLowerCase()}`}
                    className="hover:opacity-50"
                  >
                    {subcategory?.replace(/-/g, ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </>
    );
  };






  const FilteredCategoriesAccordin = () => {
    // Define custom order
    const customOrder = ['Chocolates', 'Flowers', 'Cakes', 'Events']; // Adjust according to your custom order

    // Create a map to store unique main categories and their subcategories
    const categoriesMap = dataCategory?.data?.shops?.data.reduce((acc, item) => {
      // Extract main categories and subcategories
      const mainCategories = item?.attributes?.main_categories?.data || [];
      const subcategories = item?.attributes?.sub_categories?.data || [];

      // Process each main category
      mainCategories.forEach(mainCategoryItem => {
        const mainCategory = mainCategoryItem?.attributes?.Title;

        if (mainCategory) {
          if (!acc[mainCategory]) {
            acc[mainCategory] = new Set();
          }

          // Add each subcategory to the set if it's not empty
          subcategories.forEach(subcatItem => {
            const subcategory = subcatItem?.attributes?.slug;
            if (subcategory) {
              acc[mainCategory].add(subcategory);
            }
          });
        }
      });

      return acc;
    }, {});

    // Ensure categoriesMap is an object and filter out categories with no subcategories
    const filteredCategories = categoriesMap
      ? Object.entries(categoriesMap).filter(([mainCategory, subcategories]) => subcategories.size > 0)
      : [];

    // Sort categories based on custom order
    const sortedCategories = filteredCategories.sort(([a], [b]) => {
      const indexA = customOrder.indexOf(a);
      const indexB = customOrder.indexOf(b);

      // Handle categories not in customOrder by placing them at the end
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });

    // Return null if there are no categories to display
    if (sortedCategories.length === 0) return null;

    return (
      <>
        {sortedCategories.map(([mainCategory, subcategories]) => (
          <div key={mainCategory} className="collapse collapse-plus rounded-none">
            <input
              type="radio"
              className="min-h-[10px] after:top-0"
              name="my-accordion-3"
              id={mainCategory}
            />
            <div className="collapse-title p-0 min-h-0">
              {mainCategory}
            </div>
            <div className="collapse-content !pb-0 px-0 mb-0">
              <ul className="mt-[24px] grid gap-[24px] m-0 p-0">
                {[...subcategories].map(subcategory => (
                  <li key={subcategory}>
                    <Link
                      onClick={() => {
                        setThemeLayout(mainCategory);
                      }}
                      aria-label={subcategory?.replace(/-/g, ' ')}
                      title={subcategory?.replace(/-/g, ' ')}
                      href={`/${subcategory?.replace(/-/g, '-').toLowerCase()}`}
                      className="hover:opacity-50"
                    >
                      {subcategory?.replace(/-/g, ' ')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </>
    );
  };




  const date = new Date();
  const year = date.getFullYear();



  function homeFooter() {
    return (<>
      <footer className={`container border-t border-solid md:py-[70px] py-[50px] lg:block hidden`}>
        <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid gap-[50px]">
          <div className="md:flex md:justify-between md:gap-0 grid grid-cols-2 gap-[30px]">
            <div className=" ">
              <h4 className="text-[15px] font-semibold uppercase mb-[24px]">SITEMAP</h4>
              <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
                <li>
                  <Link
                    aria-label="Home"
                    title="Home"
                    href="/"
                    className="hover:opacity-50"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Home"
                    title="Home"
                    href="/store"
                    className="hover:opacity-50"
                  >
                    Store
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="About"
                    title="About"
                    href="/about"
                    className="hover:opacity-50"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Careers"
                    title="Careers"
                    href="/careers"
                    className="hover:opacity-50"
                  >
                    Careers
                  </Link>
                </li>
                {/* <li> */}
                {/* <Link */}
                {/* aria-label="Blog" */}
                {/* title="Blog" */}
                {/* href="/blogs" */}
                {/* className="hover:opacity-50" */}
                {/* > */}
                {/* Blog */}
                {/* </Link> */}
                {/* </li> */}
              <li>
                  <Link
                    aria-label="Contact"
                    title="Contact"
                    href="/contact"
                    className="hover:opacity-50"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

            </div>
            {FilteredCategories()}
          </div>
          <div className={`${page == 'home2' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} sm:flex grid justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
            <div >
              <p>All rights reserved {year}</p>
            </div>
            <div >
              <ul className="[&>*]:text-[14px] flex gap-[20px] [&>*]:transition-all">
                <li>
                  {contactData && <Link
                    aria-label="Instagram"
                    title="Instagram"
                    href={contactData.Instagram}
                    className="hover:opacity-50"
                  >
                    Instagram
                  </Link>}
                </li>
                <li>
                  {contactData && <Link
                    aria-label="Facebook"
                    title="Facebook"
                    href={contactData.Facebook}
                    className="hover:opacity-50"
                  >
                    Facebook
                  </Link>}
                </li>
                <li>
                  {contactData && <Link
                    aria-label="Pintrest"
                    title="Pintrest"
                    href={contactData.Pintrest}
                    className="hover:opacity-50"
                  >
                    Pintrest
                  </Link>}
                </li>

              </ul>
            </div>
          </div>
        </div>
      </footer>

      <footer className={`lg:hidden bg-events-900 border-events-100 [&>*]:text-events-100  container border-t border-solid  pt-[30px] uppercase [&>*]:text-[12px] [&>*]:font-semibold`}>
        <div className="grid gap-[20px]">
          <Link aria-label='Home' title='Home' href={"/"}
            className='hover:bg-transparent'
          >
            Home
          </Link>
          <Link aria-label='Home' title='Home' href={"/store"}
            className='hover:bg-transparent'
          >
            Store
          </Link>
          <div className="accordion grid gap-[24px]">
            {FilteredCategoriesAccordin()}
          </div>
          <Link aria-label='About' title='About' href={"/about"}
            className='hover:bg-transparent'
          >About</Link>
          <Link aria-label='Careers' title='Careers' href={"/careers"}
            className='hover:bg-transparent'
          >Careers</Link>
          {/* <Link aria-label='Blog' title='Blog' href={"/blogs"} */}
          {/* className='hover:bg-transparent' */}
          {/* >Blog</Link> */}
          <Link aria-label='Contact' title='Contact' href={"/contact"}
            className='hover:bg-transparent'
          >Contact</Link>
        </div>



        <div className={`${page == 'home' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} sm:flex grid gap-[12px] justify-between border-t border-solid  py-[20px] mt-[20px]`}>
          <div className="order-2 sm:order-1">
            <p>All rights reserved {year}</p>
          </div>
          <div className="order-1 sm:order-2">
            <ul className="flex gap-[10px] [&>*]:transition-all">
              <li>
                {contactData && <Link
                  aria-label="Instagram"
                  title="Instagram"
                  href={contactData.Instagram}
                  className="hover:opacity-50"
                >
                  Instagram
                </Link>}
              </li>
              <li>
                {contactData && <Link
                  aria-label="Facebook"
                  title="Facebook"
                  href={contactData.Facebook}
                  className="hover:opacity-50"
                >
                  Facebook
                </Link>}
              </li>
              <li>
                {contactData && <Link
                  aria-label="Pintrest"
                  title="Pintrest"
                  href={contactData.Pintrest}
                  className="hover:opacity-50"
                >
                  Pintrest
                </Link>}
              </li>

            </ul>
          </div>
        </div>
      </footer>
    </>)
  };


  function home2Footer() {
    return (<>
      <footer className={`container border-t border-solid md:py-[70px] py-[50px] lg:block hidden bg-events-900 border-events-100 [&>*]:text-events-100`}>
        <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid gap-[50px]">
          <div className="md:flex md:justify-between md:gap-0 grid grid-cols-2 gap-[30px]">
            <div className=" ">
              <h4 className="text-[15px] font-semibold uppercase mb-[24px]">SITEMAP</h4>
              <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
                <li>
                  <Link
                    aria-label="Home"
                    title="Home"
                    href="/"
                    className="hover:opacity-50"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Home"
                    title="Home"
                    href="/store"
                    className="hover:opacity-50"
                  >
                    Store
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="About"
                    title="About"
                    href="/about"
                    className="hover:opacity-50"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Careers"
                    title="Careers"
                    href="/careers"
                    className="hover:opacity-50"
                  >
                    Careers
                  </Link>
                </li>
                {/* <li> */}
                {/* <Link */}
                {/* aria-label="Blog" */}
                {/* title="Blog" */}
                {/* href="/blog" */}
                {/* className="hover:opacity-50" */}
                {/* > */}
                {/* Blog */}
                {/* </Link> */}
                {/* </li> */}
                <li>
                  <Link
                    aria-label="Contact"
                    title="Contact"
                    href="/contact"
                    className="hover:opacity-50"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

            </div>
            {FilteredCategories()}
          </div>
          <div className={`${page == 'home2' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} flex justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
            <div >
              <p>All rights reserved {year}</p>
            </div>
            <div >
              <ul className="[&>*]:text-[14px] flex gap-[20px] [&>*]:transition-all">
                <li>
                  {contactData && <Link
                    aria-label="Instagram"
                    title="Instagram"
                    href={contactData.Instagram}
                    className="hover:opacity-50"
                  >
                    Instagram
                  </Link>}
                </li>
                <li>
                  {contactData && <Link
                    aria-label="Facebook"
                    title="Facebook"
                    href={contactData.Facebook}
                    className="hover:opacity-50"
                  >
                    Facebook
                  </Link>}
                </li>
                <li>
                  {contactData && <Link
                    aria-label="Pintrest"
                    title="Pintrest"
                    href={contactData.Pintrest}
                    className="hover:opacity-50"
                  >
                    Pintrest
                  </Link>}
                </li>

              </ul>
            </div>
          </div>
        </div>
      </footer>

      <footer className={`lg:hidden bg-events-900 border-events-100 [&>*]:text-events-100  container border-t border-solid  py-[30px] uppercase [&>*]:text-[12px] [&>*]:font-semibold`}>
        <div className="grid  gap-[24px]">
          <Link aria-label='Home' title='Home' href={"/"}
            className='hover:bg-transparent'
          >
            Home
          </Link>
          <Link aria-label='Home' title='Home' href={"/store"}
            className='hover:bg-transparent'
          >
            Store
          </Link>
          <div className="accordion grid gap-[24px]">
            {FilteredCategoriesAccordin()}
          </div>
          <Link aria-label='About' title='About' href={"/about"}
            className='hover:bg-transparent'
          >About</Link>
          <Link aria-label='Careers' title='Careers' href={"/about"}
            className='hover:bg-transparent'
          >Careers</Link>
          {/* <Link aria-label='Blog' title='Blog' href={"/blog"} */}
          {/* className='hover:bg-transparent' */}
          {/* >Blog</Link> */}
          <Link aria-label='Contact' title='Contact' href={"/contact"}
            className='hover:bg-transparent'
          >Contact</Link>
        </div>



        <div className={`${page == 'home' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} sm:flex grid gap-[12px] justify-between border-t border-solid  py-[20px] mt-[20px]`}>
          <div className="order-2 sm:order-1">
            <p>All rights reserved {year}</p>
          </div>
          <div className="order-1 sm:order-2">
            <ul className="flex gap-[10px] [&>*]:transition-all">
              <li>
                {contactData && <Link
                  aria-label="Instagram"
                  title="Instagram"
                  href={contactData.Instagram}
                  className="hover:opacity-50"
                >
                  Instagram
                </Link>}
              </li>
              <li>
                {contactData && <Link
                  aria-label="Facebook"
                  title="Facebook"
                  href={contactData.Facebook}
                  className="hover:opacity-50"
                >
                  Facebook
                </Link>}
              </li>
              <li>
                {contactData && <Link
                  aria-label="Pintrest"
                  title="Pintrest"
                  href={contactData.Pintrest}
                  className="hover:opacity-50"
                >
                  Pintrest
                </Link>}
              </li>

            </ul>
          </div>
        </div>
      </footer>
    </>)
  };


  function normalFooter() {
    return (<>
      <footer className={`container border-t border-black border-solid md:py-[70px] py-[50px] lg:block hidden`}>
        <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid gap-[50px]">
          <div className="md:flex md:justify-between md:gap-0 grid grid-cols-2 gap-[30px]">
            <div className=" ">
              <h4 className="text-[15px] font-semibold uppercase mb-[24px]">SITEMAP</h4>
              <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
                <li>

                  <Link
                    aria-label="Home"
                    title="Home"
                    href="/"
                    className="hover:opacity-50"
                  >
                    Home
                  </Link>
                </li>
                <li>

                  <Link
                    aria-label="Home"
                    title="Home"
                    href="/store"
                    className="hover:opacity-50"
                  >
                    Store
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="About"
                    title="About"
                    href="/about"
                    className="hover:opacity-50"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Careers"
                    title="Careers"
                    href="/careers"
                    className="hover:opacity-50"
                  >
                    Careers
                  </Link>
                </li>
                {/* <li> */}
                {/* <Link */}
                {/* aria-label="Blog" */}
                {/* title="Blog" */}
                {/* href="/blog" */}
                {/* className="hover:opacity-50" */}
                {/* > */}
                {/* Blog */}
                {/* </Link> */}
                {/* </li> */}
                <li>
                  <Link
                    aria-label="Contact"
                    title="Contact"
                    href="/contact"
                    className="hover:opacity-50"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

            </div>
            {FilteredCategories()}
          </div>
          <div className={`${page == 'home2' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} flex justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
            <div >
              <p>All rights reserved {year}</p>
            </div>
            <div >
              <ul className="[&>*]:text-[14px] flex gap-[20px] [&>*]:transition-all">
                <li>
                  {contactData && <Link
                    aria-label="Instagram"
                    title="Instagram"
                    href={contactData.Instagram}
                    className="hover:opacity-50"
                  >
                    Instagram
                  </Link>}
                </li>
                <li>
                  {contactData && <Link
                    aria-label="Facebook"
                    title="Facebook"
                    href={contactData.Facebook}
                    className="hover:opacity-50"
                  >
                    Facebook
                  </Link>}
                </li>
                <li>
                  {contactData && <Link
                    aria-label="Pintrest"
                    title="Pintrest"
                    href={contactData.Pintrest}
                    className="hover:opacity-50"
                  >
                    Pintrest
                  </Link>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <footer className={`lg:hidden container border-t border-black border-solid  py-[30px] uppercase [&>*]:text-[12px] [&>*]:font-semibold`}>
        <div className="grid  gap-[24px]">
          <Link aria-label='Home' title='Home' href={"/"}
            className='hover:bg-transparent'
          >
            Home
          </Link>
          <Link aria-label='Home' title='Home' href={"/store"}
            className='hover:bg-transparent'
          >
            Store
          </Link>
          <div className="accordion grid gap-[24px]">
            {FilteredCategoriesAccordin()}
          </div>
          <Link aria-label='About' title='About' href={"/about"}
            className='hover:bg-transparent'
          >About</Link>
          <Link aria-label='Careers' title='Careers' href={"/careers"}
            className='hover:bg-transparent'
          >Careers</Link>
          {/* <Link aria-label='Blog' title='Blog' href={"/blogs"} */}
          {/* className='hover:bg-transparent' */}
          {/* >Blog</Link> */}
          <Link aria-label='Contact' title='Contact' href={"/contact"}
            className='hover:bg-transparent'
          >Contact</Link>
        </div>



        <div className={`${page == 'home' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} sm:flex grid gap-[10px] justify-between border-t border-solid  pt-[20px] mt-[20px]`}>
          <div className="order-2 sm:order-1">
            <p>All rights reserved {year}</p>
          </div>
          <div className="order-1 sm:order-2">
            <ul className="flex gap-[10px] [&>*]:transition-all">
              <li>
                {contactData && <Link
                  aria-label="Instagram"
                  title="Instagram"
                  href={contactData.Instagram}
                  className="hover:opacity-50"
                >
                  Instagram
                </Link>}
              </li>
              <li>
                {contactData && <Link
                  aria-label="Facebook"
                  title="Facebook"
                  href={contactData.Facebook}
                  className="hover:opacity-50"
                >
                  Facebook
                </Link>}
              </li>
              <li>
                {contactData && <Link
                  aria-label="Pintrest"
                  title="Pintrest"
                  href={contactData.Pintrest}
                  className="hover:opacity-50"
                >
                  Pintrest
                </Link>}
              </li>

            </ul>
          </div>
        </div>
      </footer>
    </>)
  };


  function catFooter() {
    return (<>
      <footer className={`container border-t border-black border-solid md:py-[70px] py-[50px] lg:block hidden`}>
        <div className="mx-auto 2xl:w-[70%] xl:w-[80%] grid gap-[50px]">
          <div className="md:flex md:justify-between md:gap-0 grid grid-cols-2 gap-[30px]">
            <div className=" ">
              <h4 className="text-[15px] font-semibold uppercase mb-[24px]">SITEMAP</h4>
              <ul className="[&>*]:text-[14px] grid gap-[12px] [&>*]:transition-all capitalize">
                <li>
                  <Link
                    aria-label="Home"
                    title="Home"
                    href="/"
                    className="hover:opacity-50"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Home"
                    title="Home"
                    href="/store"
                    className="hover:opacity-50"
                  >
                    Store
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="About"
                    title="About"
                    href="/about"
                    className="hover:opacity-50"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    aria-label="Careers"
                    title="Careers"
                    href="/careers"
                    className="hover:opacity-50"
                  >
                    Careers
                  </Link>
                </li>
                {/* <li> */}
                {/* <Link */}
                {/* aria-label="Blog" */}
                {/* title="Blog" */}
                {/* href="/blog" */}
                {/* className="hover:opacity-50" */}
                {/* > */}
                {/* Blog */}
                {/* </Link> */}
                {/* </li> */}
                <li>
                  <Link
                    aria-label="Contact"
                    title="Contact"
                    href="/contact"
                    className="hover:opacity-50"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

            </div>
            {FilteredCategories()}
          </div>
          <div className={`${page == 'home2' ? 'bg-events-900 border-events-100 [&>*]:text-events-100' : 'border-black'} flex justify-between border-t border-solid  py-[30px] [&>*]:text-[14px]`}>
            <div >
              <p>All rights reserved {year}</p>
            </div>
            <div >
              <ul className="[&>*]:text-[14px] flex gap-[20px] [&>*]:transition-all">
                <li>
                  {contactData && <Link
                    aria-label="Instagram"
                    title="Instagram"
                    href={contactData.Instagram}
                    className="hover:opacity-50"
                  >
                    Instagram
                  </Link>}
                </li>
                <li>
                  {contactData && <Link
                    aria-label="Facebook"
                    title="Facebook"
                    href={contactData.Facebook}
                    className="hover:opacity-50"
                  >
                    Facebook
                  </Link>}
                </li>
                <li>
                  {contactData && <Link
                    aria-label="Pintrest"
                    title="Pintrest"
                    href={contactData.Pintrest}
                    className="hover:opacity-50"
                  >
                    Pintrest
                  </Link>}
                </li>

              </ul>
            </div>
          </div>
        </div>
      </footer>
      <BottomNav />
    </>)
  };

  let footerType;
  switch (page) {
    case "home":
      footerType = homeFooter()
      break;
    case 'home2':
      footerType = home2Footer()
      break;
    case 'category':
      footerType = catFooter()
      break;
    default:
      footerType = normalFooter()
      break;
  }

  return (
    <>
      {footerType}
    </>
  )
}





