import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import getUser from '../context/getUser'
import auth from '../firebase.auth'
import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast'
import Loading from '../components/Loading'

function Home() {
  const [user, loading] = getUser()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
      toast.success('Logged Out')
      localStorage.removeItem('rememberMeToken')
    } catch (error) {
      console.error('Error during logout:', error.message)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {user?.email ? (
            <h1 className='text-4xl text-center'>lOGGED IN USER</h1>
          ) : (
            <div>
              <h1 className='text-4xl text-center'>Home Page</h1>
              <div className='flex justify-center'>
                <button className='px-4 py-2 text-white mt-6 bg-blue-500 rounded-md'>
                  <Link to='/login'> Login</Link>
                </button>
              </div>
            </div>
          )}
          {user?.email && (
            <div>
              <p className='text-center bg-black px-3 py-1 rounded-md text-white mt-5'>
                Email: {user?.email}
              </p>

              <div className='flex justify-center gap-7 mt-8 text-white font-semibold'>
                <button
                  onClick={handleLogout}
                  className='px-4 py-2 bg-blue-500 rounded-md'
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
