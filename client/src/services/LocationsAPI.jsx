const BASE_URL = 'http://localhost:3000/api/locations'

const getAllLocations = async () => {
    try {
        const response = await fetch(BASE_URL)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('error fetching locations:', error)
        return []
    }
}

const getLocationById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`error fetching location ${id}:`, error)
        return null
    }
}

export default {
    getAllLocations,
    getLocationById
}