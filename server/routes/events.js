import express from 'express'
import { getEvents, getEventsByLocationId } from '../controllers/events.js'

const router = express.Router()

router.get('/', getEvents)
router.get('/location/:locationId', getEventsByLocationId)

export default router