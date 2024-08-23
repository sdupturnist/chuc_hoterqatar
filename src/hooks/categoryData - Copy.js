// hooks/useData.js

import { wordpressGraphQlApiUrl } from '@/utils/variables';
import { useEffect, useState } from 'react';

export const CategoryData = (initialData) => {


    const [dataCategory, setDataCategory] = useState(initialData);
    const [errorDataCategory, setErrorDataCategory] = useState(null);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await fetch(wordpressGraphQlApiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: ` query {
  shops(pagination: { limit: 1000 }) {
    data {
      attributes {
        mainCategory {
          ProductMainCategory
        }
        subcategory {
          allsubcategories
        }
      }
    }
  }
}
`,
                    }),
                    next: { revalidate: 10 },
                },
                    {
                        cache: 'force-cache',
                        cache: 'no-store'
                    });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();


                setDataCategory(data);
                //console.log(data)
            } catch (error) {
                setErrorDataCategory(error.message);
            }
        };

        if (!initialData) {
            fetchData();
        }
    }, [initialData]);



    return { dataCategory, errorDataCategory };
};



