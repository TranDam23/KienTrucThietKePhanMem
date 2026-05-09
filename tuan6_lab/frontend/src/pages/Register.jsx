import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import API from '../api/axios'

function Register() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
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

      await API.post('/auth/register', form)

      alert('Register success')

      navigate('/')

    } catch (error) {

     alert(
    error.response?.data?.message ||
    error.message
);
    }
  }
  return (
    <div className='container mt-5'>

      <div className='row justify-content-center'>

        <div className='col-md-4'>

          <div className='card p-4'>

            <h2 className='mb-4 text-center'>
              Register
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type='text'
                name='name'
                placeholder='Name'
                className='form-control mb-3'
                onChange={handleChange}
              />

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

              <button className='btn btn-primary w-100'>
                Register
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Register