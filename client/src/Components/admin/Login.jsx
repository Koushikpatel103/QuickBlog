import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContest.jsx'

const Login = () => {

  const { axios, setToken } = useAppContext()

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post('/api/admin/login', {
        email,
        password: pass
      })

      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        toast.success('Login successful')
      } else {
        toast.error(data.message || 'Login failed')
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white border border-primary/30 shadow-lg rounded-xl">

        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">
            <span className="text-primary">Admin</span> Login
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col text-left">
            <label className="font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your Email"
              className="border border-gray-300 rounded-md p-2 outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="font-medium mb-1">Password</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              placeholder="Enter your Password"
              className="border border-gray-300 rounded-md p-2 outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md mt-2 hover:bg-primary/90 transition"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  )
}

export default Login;
