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
                        query: `query {
  shops(pagination: { limit: 1000 }) {
    data {
      attributes {
        main_categories {
          data {
            attributes {
              Slug
              Title
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
      }
    }
  }
}
`,
                    }),
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();

                // Save data to localStorage
                localStorage.setItem('categoryData', JSON.stringify(data));

                setDataCategory(data);
            } catch (error) {
                setErrorDataCategory(error.message);
            }
        };

        if (!initialData) {
            // Try to get data from localStorage
            const storedData = localStorage.getItem('categoryData');
            
            if (storedData) {
                setDataCategory(JSON.parse(storedData));
            } else {
                fetchData();
            }
        } else {
            setDataCategory(initialData);
        }
    }, [initialData]);

    return { dataCategory, errorDataCategory };
};
