import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
// import Events from './pages/Events'  // TODO: stretch feature
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/echolounge',
      element: <LocationEvents index={1} />
    },
    {
      path: '/houseofblues',
      element: <LocationEvents index={2} />
    },
    {
      path: '/pavilion',
      element: <LocationEvents index={3} />
    },
    {
      path: '/americanairlines',
      element: <LocationEvents index={4} />
    }
    // TODO: stretch feature — Events page route
    // {
    //   path: '/events',
    //   element: <Events />
    // }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>UnityGrid Plaza</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          {/* TODO: stretch feature — Events link */}
          {/* <Link to='/events' role='button'>Events</Link> */}
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App