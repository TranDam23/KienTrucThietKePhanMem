import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <nav className='navbar navbar-dark bg-dark px-4'>

      <Link
        to='/movies'
        className='navbar-brand'
      >
        Movie Ticket System
      </Link>

    </nav>
  )
}

export default Navbar