'use client'

import React, { useState, useEffect } from 'react';
import { wordpressGraphQlApiUrl } from '@/utils/variables';
import { useModalContext } from '@/context/modalContext';

export default function AddReviewForm({ productId }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('5'); // Assuming rating is a string initially
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [sendProgress, setSendProgress] = useState(false);
  const [successLabel, setSuccessLabel] = useState(false);
  const [buttonLabel, setButtonLabel] = useState(true);
  const [status, setStatus] = useState('');
  const [existingReviews, setExistingReviews] = useState([]);

  const { setShowModal } = useModalContext();

  const todayDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Function to fetch existing reviews
  const fetchExistingReviews = async () => {
    try {
      const response = await fetch(wordpressGraphQlApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            query($productId: ID!) {
              shop(id: $productId) {
                data {
                  attributes {
                    reviews {
                      id
                      rating
                      author
                      comment
                      postedDate
                      authorEmail
                      showPublic
                    }
                  }
                }
              }
            }
          `,
          variables: { productId }
        })
      });
      const result = await response.json();
      const reviews = result.data.shop.data.attributes.reviews || [];
      setExistingReviews(reviews);
    } catch (error) {
     // console.error('Error fetching reviews:', error);
    }
  };

  // Function to submit review
  const sendReview = async () => {
    try {
      const updatedReviews = [
        ...existingReviews,
        {
          rating: parseInt(rating, 10), // Convert rating to integer
          author: name,
          comment: comment,
          postedDate: todayDate,
          authorEmail: email,
          showPublic: false
        }
      ];

      const response = await fetch(wordpressGraphQlApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation($productId: ID!, $reviews: [ComponentProductreviewsReviewsInput]) {
              updateShop(
                id: $productId,
                data: {
                  reviews: $reviews
                }
              ) {
                data {
                  attributes {
                    reviews {
                      id
                      rating
                      author
                      comment
                      postedDate
                      authorEmail
                      showPublic
                    }
                  }
                }
              }
            }
          `,
          variables: {
            productId,
            reviews: updatedReviews
          }
        })
      });
      const result = await response.json();
     // console.log('Review submitted:', result);
      setSendProgress(true);

      const res = await fetch('/api/reviewSendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, name, rating, comment, todayDate })
      });

      if (res.ok) {
        setStatus('Email sent successfully!');
      } else {
        setStatus('Failed to send email');
      }

      setTimeout(() => {
        setSuccessLabel(true);
        setSendProgress(false);
      }, 3000);

      setTimeout(() => {
        setSuccessLabel(false);
        setButtonLabel(true);
        setName('');
        setEmail('');
        setComment('');
        setShowModal(false);
      }, 5000);
    } catch (error) {
      setStatus('An error occurred');
     // console.error('Error submitting review:', error);
    }
  };

  // Validate form
  const validateForm = () => {
    let errors = {};

    if (!name) {
      errors.name = 'Name is required.';
    }

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  // Submit handler
  const submitReview = () => {
    validateForm();
    if (isFormValid) {
      fetchExistingReviews().then(() => {
        sendReview();
        setButtonLabel(false);
        setSendProgress(true);
      });
    }
  };

  useEffect(() => {
    fetchExistingReviews();
  }, []);

  return (
    <>
      <div className="w-full grid gap-[16px]">
        <h2 className='uppercase text-[18px] font-semibold tracking-[1%] mb-[10px]'>Ratings & Review</h2>
        <div className="rating rating-lg mb-3 gap-[10px] flex">
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="1"
            checked={rating === '1'}
            onChange={() => setRating('1')}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="2"
            checked={rating === '2'}
            onChange={() => setRating('2')}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="3"
            checked={rating === '3'}
            onChange={() => setRating('3')}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="4"
            checked={rating === '4'}
            onChange={() => setRating('4')}
          />
          <input
            type="radio"
            name="rating-1"
            className="mask mask-star-2 bg-black"
            value="5"
            checked={rating === '5'}
            onChange={() => setRating('5')}
          />
        </div>
        <input
          type="text"
          placeholder="Full name"
          className="input  placeholder:text-black border-black w-full text-black rounded-[6px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          required
        />
        {errors.name && <p className='text-red-500 mb-3'>{errors.name}</p>}
        <input
          type="email"
          placeholder="Email"
          className="input  placeholder:text-black border-black w-full text-black rounded-[6px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
        />
        {errors.email && <p className='text-red-500 mb-3'>{errors.email}</p>}
        <textarea
          className="textarea  placeholder:text-black border-black textarea-bordered w-full text-black rounded-[6px]"
          placeholder="Review this product"
          value={comment}
          rows={5}
          onChange={(e) => setComment(e.target.value)}
          name="comment"
        ></textarea>

        <div>
          <button
            title="Submit"
            aria-label="Submit"
            type="submit"
            className="btn btn-neutral bg-black rounded-[6px] w-full"
            onClick={submitReview}
          >
            <span className={buttonLabel === false ? "hidden" : ""}>
              Submit
            </span>
            <span className={successLabel === false ? "hidden" : ""}>
              Done! Submitted
            </span>
            <span className={`${sendProgress === false ? "hidden" : ""} flex gap-2 justify-center`}>
              <span className="loading loading-spinner loading-xs"></span>
              <span className='ml-3 leading-[20px]'>
                Submitting...
              </span>
            </span>
          </button>

          {successLabel && (
            <div role="alert" className="alert alert-success mt-7 rounded-md text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Thanks for your review. We will publish it soon.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
