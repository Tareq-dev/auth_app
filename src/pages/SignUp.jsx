import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import auth from '../firebase.auth'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import toast from 'react-hot-toast'
import SocialLogin from '../components/SocialLogin'

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [firebaseErrors, setFirebaseErrors] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  let from = location?.state?.from?.pathname || '/'
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setErrors({
      ...errors,
      [name]: '',
    })
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { email: '', password: '', confirmPassword: '' }

    // Validation logic for email
    if (!formData.email) {
      isValid = false
      newErrors.email = 'Email is required'
    }

    // Validation logic for password
    if (!formData.password) {
      isValid = false
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      isValid = false
      newErrors.password = 'Password should be at least 6 characters'
    }

    // Validation logic for confirmPassword
    if (!formData.confirmPassword) {
      isValid = false
      newErrors.confirmPassword = 'Confirm Password is required'
    } else if (formData.password !== formData.confirmPassword) {
      isValid = false
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Perform your sign-up logic here using formData
      // console.log('Form is valid. Submitting...', formData)
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password,
        )
        if (response?.user?.uid) {
          navigate(from, { replace: true })

          setFirebaseErrors('')
          toast.success('registed Successfully!')
        }
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          setFirebaseErrors('Email is already in use.')
        } else {
          setFirebaseErrors(error.message)
        }
      }
    } else {
      console.log('Form is invalid. Please fix the errors.')
    }
  }

  return (
    <div className='flex justify-center items-center h-screen m-4'>
      <div className='w-full max-w-md p-8 space-y-3 rounded-xl border bg-white font-sans mx-auto'>
        <h1 className='text-3xl font-bold text-center text-indigo-600'>
          Sign Up
        </h1>
        <form action='' className='space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-2 text-sm'>
            <label htmlFor='email' className='block'>
              Your Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring'
            />
            {errors.email && <p className='text-red-500'>{errors.email}</p>}
          </div>
          <div className='space-y-2 text-sm'>
            <label htmlFor='password' className='block'>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring'
            />
            {errors.password && (
              <p className='text-red-500'>{errors.password}</p>
            )}
          </div>
          <div className='space-y-2 text-sm'>
            <label htmlFor='confirmPassword' className='block'>
              Confirm Password
            </label>
            <input
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring'
            />
            {errors.confirmPassword && (
              <p className='text-red-500'>{errors.confirmPassword}</p>
            )}
          </div>
          <p className='text-red-500 error-margin text-md'>{firebaseErrors}</p>
          <button
            type='submit'
            className='text-lg rounded-xl relative p-[10px] block w-full bg-indigo-600 text-white border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group'
          >
            Sign Up
            <span className='absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white'>
              Let's go
            </span>
            <span className='bg-indigo-800 absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000'></span>
            <span className='bg-indigo-800 absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000'></span>
            <span className='bg-indigo-800 absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000'></span>
            <span className='bg-indigo-800 absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000'></span>
          </button>
        </form>
        <SocialLogin />
        <p className='text-sm text-center gap-2 flex justify-center sm:px-6 '>
          Already have an account?
          <Link className='underline hover:text-indigo-600' to='/login'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
