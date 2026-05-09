import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Movies from './pages/Movies'
import Booking from './pages/Booking'

import Navbar from './components/Navbar'

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path='/'
          element={<Login />}
        />

        <Route
          path='/register'
          element={<Register />}
        />

        <Route
          path='/movies'
          element={<Movies />}
        />

        <Route
          path='/booking/:id'
          element={<Booking />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App