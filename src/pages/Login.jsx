import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import auth from "../firebase.auth"
import toast from "react-hot-toast"
import SocialLogin from "../components/SocialLogin"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })
  const [firebaseErrors, setFirebaseErrors] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  let from = location?.state?.from?.pathname || "/"
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setErrors({
      ...errors,
      [name]: "",
    })
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { email: "", password: "" }

    // Add your validation logic here
    if (!formData.email) {
      isValid = false
      newErrors.email = "Email is required"
    }

    if (!formData.password) {
      isValid = false
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      isValid = false
      newErrors.password = "Password should be at least 6 characters"
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Perform your login logic here using formData
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        )
        if (response?.user?.uid) {
          navigate(from, { replace: true })
          toast.success("Login Successfully!")
          if (rememberMe) {
            // Store a secure, encrypted token in local storage
            localStorage.setItem("rememberMeToken", response?.user?.uid)
          }
          setFirebaseErrors("")
        }
      } catch (error) {
        console.log(error)
        if (error.code === "auth/invalid-credential") {
          setFirebaseErrors("Invalid credential.")
        } else {
          setFirebaseErrors(error.message)
        }
      }
    } else {
      console.log("Form is invalid. Please fix the errors.")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen mx-4">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl border bg-white font-sans mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#27634D]">
          Login
        </h1>
        <form action="" className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2 text-sm">
            <label htmlFor="email" className="block">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2 text-sm">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <div className="flex justify-end text-xs">
              <Link to="/forgot-password" className="hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <label htmlFor="rememberMe" className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              Remember me
            </label>
          </div>

          <p className="text-red-500 error-margin text-md">{firebaseErrors}</p>
          <button
            type="submit"
            className="text-lg rounded-xl relative p-[10px] block w-full bg-[#27634D] text-white border-y-4 duration-500 overflow-hidden focus:border-[#27634D] z-50 group"
          >
            Login
            <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
              Let's go
            </span>
            <span className="bg-[#1f8a62] absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
            <span className="bg-[#1f8a62] absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
            <span className="bg-[#1f8a62] absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
            <span className="bg-[#1f8a62] absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
          </button>
        </form>
        <SocialLogin />

        <p className="text-sm text-center gap-2 flex justify-center sm:px-6 ">
          Don't have an account?
          <Link className="underline hover:text-indigo-600" to="/sign-up">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
