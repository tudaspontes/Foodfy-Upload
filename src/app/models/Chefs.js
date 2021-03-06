const db = require("../../config/db")
const { date } = require("../../lib/utils")

module.exports = {
    all() {
        return db.query(`SELECT * FROM chefs`)


    },
    create(data) {
        const query = `
        INSERT INTO chefs (
            name,
            created_at,
            file_id
        ) VALUES ($1, $2, $3)
        RETURNING id   
    `

    const values = [
        data.name,
        date(Date.now()).iso,
        data.file_id

    ]

    return db.query(query, values)


    },
    find(id) {
        return db.query(`
        SELECT chefs.*, count(recipes.id) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        WHERE chefs.id = $1
        GROUP BY chefs.id`, [id])
    },
    recipeInformations(id) {
        return db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
        WHERE chef_id = $1;`, [id])
    },
    update(data) {
        const query = `
        UPDATE chefs SET
            name=($1),
            file_id=($2)
        WHERE id = $3
        `

        const values = [
            data.name,
            data.file_id,
            data.id            
        ]

        return db.query(query, values)
    },
    delete(id) {
        return db.query(`
        DELETE
        FROM chefs
        WHERE id = $1`, [id])
    }
}