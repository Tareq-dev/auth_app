// ForgotPassword.js
import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import auth from '../firebase.auth'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [emailError, setEmailError] = useState('')

  const handleResetSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setEmailError('Email is required')
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      setResetSent(true)
      toast.success('Password reset email sent. Check your inbox.')
    } catch (error) {
      console.error(error)
      toast.error('Error sending password reset email.')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen mx-4'>
      {resetSent ? (
        <p>Password reset email sent. Check your inbox.</p>
      ) : (
        <form onSubmit={handleResetSubmit} className='max-w-md w-full'>
          <h1 className='text-2xl font-semibold text-center pb-6'>
            Forget Password ?
          </h1>
          <label htmlFor='email' className='block  text-center text-md mb-2'>
            Enter your email:
          </label>
          <input
            type='email'
            id='email'
            placeholder='Enter your email address'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailError('') // Clear email error on change
            }}
            className={`w-full px-4 py-2 border ${
              emailError ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring`}
          />
          {emailError && (
            <p className='text-red-500 text-center mt-4 text-sm'>
              {emailError}
            </p>
          )}
          <div className='flex justify-center'>
            <button
              type='submit'
              className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring'
            >
              Send Reset Email
            </button>
          </div>
        </form>      )}
      <button className='mt-8 px-2 py-1 bg-blue-600 text-white rounded-md focus:outline-none focus:ring'>
        <Link to='/'> Home</Link>
      </button>
    </div>
  )
}

export default ForgotPassword
