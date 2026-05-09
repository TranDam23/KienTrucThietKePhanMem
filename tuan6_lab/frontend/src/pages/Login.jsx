import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
function Login() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const res = await API.post(
        '/auth/login',
        form
      )

      localStorage.setItem(
        'token',
        res.data.token
      )

      alert('Login success')

      navigate('/movies')

    } catch (error) {

      alert(error.response.data.message)
    }
  }

   return (
    <div className='container mt-5'>

      <div className='row justify-content-center'>

        <div className='col-md-4'>

          <div className='card p-4'>

            <h2 className='mb-4 text-center'>
              Login
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type='email'
                name='email'
                placeholder='Email'
                className='form-control mb-3'
                onChange={handleChange}
              />

              <input
                type='password'
                name='password'
                placeholder='Password'
                className='form-control mb-3'
                onChange={handleChange}
              />

              <button className='btn btn-success w-100'>
                Login
              </button>

            </form>

            <Link
              to='/register'
              className='mt-3 text-center'
            >
              Register account
            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login