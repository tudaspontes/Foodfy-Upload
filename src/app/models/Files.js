const db = require("../../config/db")
const { date } = require("../../lib/utils")
const fs = require('fs')

module.exports = {
    all() {
        return db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        `)


    },
    create({filename, path, file_id}) {
        const query = `
            INSERT INTO files (
                name,
                path,
                file_id
            ) VALUES ($1, $2, $3)
            RETURNING id    
    `

        const values = [
            filename,
            path,
            file_id
        ]

    return db.query(query, values)

    },
    find(id) {
        return db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.id = $1`, [id])
    },
    findby(filter) {
        return db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE recipes.title ILIKE '%${filter}%'
        OR chefs.name ILIKE '%${filter}%'
        `)
    },
    update(data) {
        const query = `
        UPDATE recipes SET
            chef_id=($1),
            image=($2),
            title=($3),
            ingredients=($4),
            preparation=($5),
            information=($6)
        WHERE id = $7
        `

        const values = [
            data.chef,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id            
        ]

        return db.query(query, values)
    },
    delete(id) {
        return db.query(`
        DELETE
        FROM recipes
        WHERE id = $1`, [id])
    },
    chefsSelectOptions() {
        return db.query(`SELECT name, id FROM chefs`)
    }
}

// comment
