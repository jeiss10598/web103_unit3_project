const BASE_URL = 'http://localhost:3000/api/events'

const getAllEvents = async () => {
    try {
        const response = await fetch(BASE_URL)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('error fetching events:', error)
        return []
    }
}

const getEventsByLocationId = async (locationId) => {
    try {
        const response = await fetch(`${BASE_URL}/location/${locationId}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`error fetching events for location ${locationId}:`, error)
        return []
    }
}

export default {
    getAllEvents,
    getEventsByLocationId
}