import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import API from '../api/axios'

function Movies() {

  const navigate = useNavigate()

  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {

    try {

      const res = await API.get('/movies')

      setMovies(res.data)

    } catch (error) {

      console.log(error)
    }
  }

  useEffect(() => {

    fetchMovies()

  }, [])

  return (
    <div className='container mt-4'>

      <h2 className='mb-4'>Movie List</h2>

      <div className='row'>

        {
          movies.map((movie) => (

            <div
              className='col-md-4 mb-4'
              key={movie._id}
            >

              <div className='card p-3 h-100'>

                <h4>{movie.title}</h4>

                <p>{movie.description}</p>

                <p>
                  Price: {movie.price} VND
                </p>

                <p>
                  Seats: {movie.seats}
                </p>

                <button
                  className='btn btn-primary'
                  onClick={() =>
                    navigate(`/booking/${movie._id}`)
                  }
                >
                  Book Ticket
                </button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Movies