import React, { useState, useEffect } from 'react'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const LocationEvents = ({ index }) => {
    const [location, setLocation] = useState({})
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const locationData = await LocationsAPI.getLocationById(index)
                setLocation(locationData)

                const eventsData = await EventsAPI.getEventsByLocationId(index)
                setEvents(eventsData)
            } catch (error) {
                console.error('error loading location events:', error)
            }
        })()
    }, [index])

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.description}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <article key={event.id} className='event-card'>
                            <h3>{event.name}</h3>
                            <p className='event-type'>{event.type}</p>
                            <p>{event.description}</p>
                        </article>
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> No events at this location yet!</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents