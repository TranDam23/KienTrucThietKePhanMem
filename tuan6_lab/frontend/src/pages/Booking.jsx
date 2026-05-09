import { useState } from 'react'

import { useParams } from 'react-router-dom'

import API from '../api/axios'

function Booking() {

  const { id } = useParams()

  const [seat, setSeat] = useState('')

  const handleBooking = async () => {

    try {

      await API.post('/bookings', {

        userId: 'USER_001',

        movieId: id,

        seats: [seat],

        amount: 100000,
      })

      alert(
        'Booking created. Waiting payment...'
      )

    } catch (error) {

      console.log(error)
    }
  }

  return (
    <div className='container mt-5'>

      <div className='row justify-content-center'>

        <div className='col-md-5'>

          <div className='card p-4'>

            <h3 className='mb-4'>Book Ticket</h3>

            <input
              type='text'
              placeholder='Seat Example: A1'
              className='form-control mb-3'
              value={seat}
              onChange={(e) =>
                setSeat(e.target.value)
              }
            />

            <button
              className='btn btn-success'
              onClick={handleBooking}
            >
              Confirm Booking
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Booking
