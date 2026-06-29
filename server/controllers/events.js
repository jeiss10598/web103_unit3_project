import { pool } from '../config/database.js'

export const getEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC;')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getEventsByLocationId = async (req, res) => {
    try {
        const locationId = parseInt(req.params.locationId)
        const results = await pool.query(
            'SELECT * FROM events WHERE location_id = $1 ORDER BY id ASC;',
            [locationId]
        )
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}