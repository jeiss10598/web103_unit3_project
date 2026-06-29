import { pool } from './database.js'
import 'dotenv/config'

const locations = [
    {
        name: 'Forest',
        description: 'A dense, dark woodland teeming with wildlife and crafting materials.',
        image: 'https://placehold.co/600x400/2d4a2b/ffffff?text=Forest'
    },
    {
        name: 'Hospital',
        description: 'An abandoned medical facility with painkillers, bandages, and clinical supplies.',
        image: 'https://placehold.co/600x400/4a2b2b/ffffff?text=Hospital'
    },
    {
        name: 'Beach',
        description: 'A windy shoreline scattered with driftwood, fishing gear, and seafood.',
        image: 'https://placehold.co/600x400/c2b280/ffffff?text=Beach'
    },
    {
        name: 'Pond',
        description: 'A still freshwater pond surrounded by amphibians and aquatic resources.',
        image: 'https://placehold.co/600x400/2b4a4a/ffffff?text=Pond'
    }
]

const events = [
    { location_id: 1, name: 'Wild Wolf', type: 'Animal', description: 'A pack predator. Tough but rewards meat and hide.' },
    { location_id: 1, name: 'Bat', type: 'Animal', description: 'A weak nocturnal animal. Easy meat for early game.' },
    { location_id: 1, name: 'Branch', type: 'Item', description: 'A wooden branch. Used to craft early melee weapons.' },
    { location_id: 1, name: 'Stone', type: 'Item', description: 'A common rock. Useful for crafting and throwing.' },

    { location_id: 2, name: 'Bandage', type: 'Item', description: 'A medical bandage. Used to craft healing items.' },
    { location_id: 2, name: 'Ethanol', type: 'Item', description: 'A flammable medical solvent. Combine with other items.' },
    { location_id: 2, name: 'Painkiller', type: 'Item', description: 'Restores health over time. Common hospital loot.' },

    { location_id: 3, name: 'Carp', type: 'Animal', description: 'A common fish caught near the shore.' },
    { location_id: 3, name: 'Driftwood', type: 'Item', description: 'Washed-up wood. Useful as a crafting base.' },
    { location_id: 3, name: 'Oyster', type: 'Animal', description: 'A shellfish that yields meat and a pearl.' },

    { location_id: 4, name: 'Frog', type: 'Animal', description: 'A small amphibian. Easy to catch in still water.' },
    { location_id: 4, name: 'Water', type: 'Item', description: 'Pure pond water. Used in crafting healing items.' }
]

const createTables = async () => {
    const createLocationsTable = `
        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            image VARCHAR(500)
        );
    `

    const createEventsTable = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            location_id INTEGER REFERENCES locations(id),
            name VARCHAR(100) NOT NULL,
            type VARCHAR(50),
            description TEXT
        );
    `

    try {
        await pool.query('DROP TABLE IF EXISTS events;')
        await pool.query('DROP TABLE IF EXISTS locations;')
        await pool.query(createLocationsTable)
        await pool.query(createEventsTable)
        console.log('🎉 tables created successfully')
    } catch (error) {
        console.error('⚠️ error creating tables', error)
    }
}

const seedLocations = async () => {
    for (const location of locations) {
        try {
            await pool.query(
                'INSERT INTO locations (name, description, image) VALUES ($1, $2, $3);',
                [location.name, location.description, location.image]
            )
            console.log(`✅ inserted location ${location.name}`)
        } catch (error) {
            console.error(`⚠️ error inserting location ${location.name}`, error)
        }
    }
}

const seedEvents = async () => {
    for (const event of events) {
        try {
            await pool.query(
                'INSERT INTO events (location_id, name, type, description) VALUES ($1, $2, $3, $4);',
                [event.location_id, event.name, event.type, event.description]
            )
            console.log(`✅ inserted event ${event.name}`)
        } catch (error) {
            console.error(`⚠️ error inserting event ${event.name}`, error)
        }
    }
}

const reset = async () => {
    await createTables()
    await seedLocations()
    await seedEvents()
    pool.end()
}

reset()