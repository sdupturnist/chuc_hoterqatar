'use client'

import React, { useState, useEffect } from 'react'
import { wordpressGraphQlApiUrl, frontendUrl, siteEmail, siteFromEmail } from '@/utils/variables'
import { useRouter } from 'next/navigation'



export default function ContactForm() {

  const router = useRouter()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [sendProgress, setSendProgress] = useState(false)
  const [successLabel, setSuccessLabel] = useState(false)
  const [buttonLabel, setButtonLabel] = useState(true)
  const [status, setStatus] = useState('');


  async function sendMail() {


    setSendProgress(true)



    try {
      const res = await fetch('/api/contactSendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (res.ok) {
        setStatus('Email sent successfully!');
      } else {
        setStatus('Failed to send email');
      }
    } catch (error) {
      setStatus('An error occurred');
      //console.log(error)
    }

  }


  useEffect(() => {
  }, [name, email, phone, message]);

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

    if (!phone) {
      errors.phone = 'Phone is required.';
    }


    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };



  // Submit 
  const submitEmail = () => {

    validateForm()
    if (isFormValid) {
      sendMail()
      setButtonLabel(false)
      setSendProgress(true)
      setIsFormValid(false)
      setTimeout(() => {
        setSuccessLabel(true)
        setSendProgress(false)
      }, 3000);
      setTimeout(() => {
        setSuccessLabel(false)
        setButtonLabel(true)
        setName('')
        setEmail('')
        setPhone('')
        setMessage('')
      }, 4000);

      //router.push('/success')
    }

  };

  return (
    <>

      <div className="w-full grid gap-[16px]">

        <input
          type="text"
          placeholder="Full name"
          className="input  placeholder:text-black border-black w-full text-black rounded-[6px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          required
        />
        {errors.name && <p className='text-red-500'>{errors.name}</p>}
        <input
          type="number"
          placeholder="Phone Number"
          className="input  placeholder:text-black border-black w-full text-black rounded-[6px]"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
          required
        />
        {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
        <input
          type="email"
          placeholder="Email"
          className="input  placeholder:text-black border-black w-full text-black rounded-[6px]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
        />
        {errors.email && <p className='text-red-500'>{errors.email}</p>}
        <textarea
          className="textarea  placeholder:text-black border-black textarea-bordered w-full text-black rounded-[6px]"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
        ></textarea>



        <div>

          <button title="Submit" aria-label="Submit" type="submit" className="btn rounded-[6px] w-full" onClick={submitEmail}>
          <span className={buttonLabel == false ? "hidden" : ""}>
                            Proceed to order
                        </span>
                        <span className={successLabel == false ? "hidden" : ""}>
                            Done! Order finished
                        </span>
                        <span className={`${sendProgress == false ? "hidden" : ""} flex gap-2 justify-center`}>
                            <span className="loading loading-spinner loading-xs "></span>
                            <span className='ml-3 pt-[5px]'>
                                Submitting...
                            </span>
                        </span>
          </button>
        </div>
      </div>
      {/* <div className={`${!successLabel == false ? "hidden" : ""} border border-green-400 text-green-400 text-opacity-100 p-4 text-center mt-4`}>Thank you for contacting us. We'll get back to you very soon</div> */}
    </>
  )
}

