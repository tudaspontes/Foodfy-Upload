const db = require("../../config/db")
const { date } = require("../../lib/utils")
const fs = require('fs')

module.exports = {
    create({ filename, path}) {
        try {
            const query = `
                INSERT INTO files (
                    name,
                    path
                ) VALUES ($1, $2)    
                RETURNING id
            `

            const values = [
                filename,
                path
            ]

            return db.query(query, values) 
        } catch (err) {
            console.error(err)
        }
    }
}
